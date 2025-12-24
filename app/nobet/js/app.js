/**
 * Main Application File
 * Coordinate Global State, IDs, and Advanced Scheduler
 */

// Global State Variables
let personeller = [];
let seciliPersonelId = null; // Changed from index to ID
let mevcutAdim = 0;
const adimlar = ['girisAdimi', 'personelAdimi', 'sonucAdimi'];
let duzenlemeModu = false;
let seciliMazeretGunleri = new Set();
let takvimGunleri = [];
let mazeretAciklamalari = {};

/**
 * Initialize Application
 */
document.addEventListener('DOMContentLoaded', function () {
    // Migration & Load
    loadFromStorage();

    // Theme
    uiHelpers.initTheme();

    // Default Dates
    const bugun = new Date();
    const birAySonra = new Date();
    birAySonra.setMonth(birAySonra.getMonth() + 1);

    const bugunStr = bugun.toISOString().split('T')[0];

    // Set inputs if empty
    const startInput = document.getElementById('baslangicTarihi');
    const endInput = document.getElementById('bitisTarihi');

    if (!startInput.value) startInput.value = bugunStr;
    startInput.min = bugunStr;

    if (!endInput.value) endInput.value = birAySonra.toISOString().split('T')[0];
    endInput.min = bugunStr;

    // Listeners
    initEventListeners();

    // Check data
    if (personeller.length > 0) {
        personelListesiniGuncelle();
        nobetDagilimKontrol();
    }
});

/**
 * Event Listeners
 */
function initEventListeners() {
    // Settings Live Save
    const inputs = ['baslangicTarihi', 'bitisTarihi', 'nobetciSayisi', 'ustUsteNobetSayisi', 'nobetArasiGun', 'haftaSonuAyri'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                if (id === 'baslangicTarihi') {
                    document.getElementById('bitisTarihi').min = el.value;
                }
                saveToStorage();
                nobetDagilimKontrol(); // Live stats update
            });
        }
    });

    // Buttons
    document.getElementById('personelEkleBtn').addEventListener('click', () => {
        duzenlemeModu = false;
        document.getElementById('personelModalBaslik').textContent = 'Personel Ekle';
        document.getElementById('personelAdi').value = '';
        uiHelpers.openModal('personelModal');
        setTimeout(() => document.getElementById('personelAdi').focus(), 100);
    });

    document.getElementById('devamBtn').addEventListener('click', handleDevamBtn);
    document.getElementById('geriBtn').addEventListener('click', handleGeriBtn);
    document.getElementById('yenidenOlusturBtn').addEventListener('click', nobetListesiOlustur);

    // Excel & Bulk Operations
    document.getElementById('excelAktarBtn').addEventListener('click', excelAktar);
    document.getElementById('personelDisariAktarBtn').addEventListener('click', personelDisariAktar);
    document.getElementById('personelIcerikAktarBtn').addEventListener('click', personelIcerikAktar);
    document.getElementById('tumunuSilBtn').addEventListener('click', tumunuSil);

    // Helpers
    document.getElementById('yardimBtn').addEventListener('click', () => uiHelpers.showHelp());
    document.getElementById('themeToggle').addEventListener('click', () => uiHelpers.toggleTheme());
}

/**
 * Storage Operations
 */
function saveToStorage() {
    storage.savePersonnel(personeller);
    const ayarlar = {
        baslangicTarihi: document.getElementById('baslangicTarihi').value,
        bitisTarihi: document.getElementById('bitisTarihi').value,
        nobetciSayisi: document.getElementById('nobetciSayisi').value,
        ustUsteNobetSayisi: document.getElementById('ustUsteNobetSayisi').value,
        nobetArasiGun: document.getElementById('nobetArasiGun').value,
        haftaSonuAyri: document.getElementById('haftaSonuAyri').checked
    };
    storage.saveSettings(ayarlar);
}

function loadFromStorage() {
    personeller = storage.loadPersonnel(); // Auto-migrates if needed

    const savedAyarlar = storage.loadSettings();
    if (savedAyarlar) {
        document.getElementById('baslangicTarihi').value = savedAyarlar.baslangicTarihi || '';
        document.getElementById('bitisTarihi').value = savedAyarlar.bitisTarihi || '';
        document.getElementById('nobetciSayisi').value = savedAyarlar.nobetciSayisi || 1;
        document.getElementById('ustUsteNobetSayisi').value = savedAyarlar.ustUsteNobetSayisi || 2;
        document.getElementById('nobetArasiGun').value = savedAyarlar.nobetArasiGun || 3;
        document.getElementById('haftaSonuAyri').checked = savedAyarlar.haftaSonuAyri !== false;
    }
}

/**
 * Personnel Operations (ID-Based)
 */
function personelKaydet() {
    const ad = document.getElementById('personelAdi').value.trim();
    if (ad) {
        const safeAd = uiHelpers.escapeHtml(ad);

        if (duzenlemeModu && seciliPersonelId) {
            // Update
            const p = personeller.find(p => p.id === seciliPersonelId);
            if (p) {
                p.ad = safeAd;
                uiHelpers.showToast("Personel güncellendi", "success");
            }
        } else {
            // New
            const newPerson = {
                id: storage.generateID(), // Generate short ID
                ad: safeAd,
                nobetSayisi: 0,
                haftaSonuNobetSayisi: 0,
                mazeretler: [],
                sonNobet: null,
                ustusteNobet: 0
            };
            personeller.unshift(newPerson);
            uiHelpers.showToast("Personel eklendi", "success");
        }

        personelListesiniGuncelle();
        uiHelpers.closeModal('personelModal');
        document.getElementById('personelAdi').value = '';
        nobetDagilimKontrol();
        saveToStorage();
    } else {
        uiHelpers.showToast("İsim boş olamaz!", "warning");
    }
}

function personelSil(id) {
    const pIndex = personeller.findIndex(p => p.id === id);
    if (pIndex > -1) {
        if (confirm(`${personeller[pIndex].ad} silinsin mi?`)) {
            personeller.splice(pIndex, 1);
            personelListesiniGuncelle();
            nobetDagilimKontrol();
            saveToStorage();
            uiHelpers.showToast("Personel silindi", "info");
        }
    }
}

function personelAdiGuncelle(id, yeniAd) {
    const safeAd = uiHelpers.escapeHtml(yeniAd.trim());
    const p = personeller.find(p => p.id === id);

    if (p && safeAd !== '') {
        p.ad = safeAd;
        saveToStorage();
    } else {
        personelListesiniGuncelle(); // Revert UI
        uiHelpers.showToast("İsim geçersiz!", "error");
    }
}

function personelListesiniGuncelle() {
    const tbody = document.getElementById('personelListesi');
    tbody.innerHTML = '';

    personeller.forEach((p) => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-blue-50/50 transition-colors border-b border-slate-100 dark:border-slate-800 dark:hover:bg-slate-800/50';

        const mazeretSayisi = p.mazeretler ? p.mazeretler.length : 0;
        const mazeretBadge = mazeretSayisi > 0 ?
            `<span class="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors" onclick="mazeretModalAc('${p.id}')">${mazeretSayisi} Gün</span>` :
            '';

        tr.innerHTML = `
            <td class="p-3">
                <div contenteditable="true" class="outline-none focus:text-blue-600 font-medium" 
                     onblur="personelAdiGuncelle('${p.id}', this.textContent)">${p.ad}</div>
            </td>
            <td class="p-3 text-center text-slate-600 dark:text-slate-400">${p.nobetSayisi}</td>
            <td class="p-3 text-center text-slate-600 dark:text-slate-400">${p.haftaSonuNobetSayisi}</td>
            <td class="p-3 text-center">${mazeretBadge}</td>
            <td class="p-3 text-center">
                <div class="flex justify-center space-x-2">
                    <button onclick="mazeretModalAc('${p.id}')" class="text-slate-400 hover:text-yellow-600 transition-colors" title="Mazeret Ekle/Düzenle">
                        <i class="ri-calendar-close-line text-lg"></i>
                    </button>
                    <button onclick="personelSil('${p.id}')" class="text-slate-400 hover:text-red-600 transition-colors" title="Sil">
                        <i class="ri-delete-bin-line text-lg"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('toplamPersonelSayisi').textContent = personeller.length;
}

/**
 * Mazeret System
 */
window.mazeretModalAc = function (id) {
    const p = personeller.find(p => p.id === id);
    if (!p) return;

    seciliPersonelId = id;
    document.getElementById('mazeretPersonelAdi').textContent = p.ad;
    uiHelpers.openModal('mazeretModal');

    // Load constraints
    seciliMazeretGunleri = new Set();
    mazeretAciklamalari = {};
    if (p.mazeretler) {
        p.mazeretler.forEach(m => {
            seciliMazeretGunleri.add(m.tarih);
            mazeretAciklamalari[m.tarih] = m.aciklama;
        });
    }

    takvimOlustur();
    mazeretListesiGuncelle(); // ✓ Mevcut mazeretleri listede göster
};

function takvimOlustur() {
    const baslangicInput = document.getElementById('baslangicTarihi').value;
    const bitisInput = document.getElementById('bitisTarihi').value;

    if (!baslangicInput || !bitisInput) return;

    const baslangic = new Date(baslangicInput);
    const bitis = new Date(bitisInput);

    // Protection
    if (baslangic > bitis) {
        document.getElementById('takvim').innerHTML = '<div class="col-span-7 p-4 text-center text-red-500 font-medium">Lütfen geçerli bir tarih aralığı seçin.</div>';
        return;
    }

    const takvim = document.getElementById('takvim');
    takvim.innerHTML = '';
    takvimGunleri = [];

    // TR Week Format: Start Monday
    const gunIsimleri = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

    // Header
    gunIsimleri.forEach(gun => {
        const el = document.createElement('div');
        el.className = 'text-center text-xs font-bold text-slate-500 dark:text-slate-400 py-2 bg-slate-100 dark:bg-slate-800 rounded mb-1';
        el.textContent = gun;
        takvim.appendChild(el);
    });

    // Calculate start padding (Mon=0, ..., Sun=6)
    // getDay(): Sun=0, Mon=1...
    // We want Mon=0, ..., Sun=6.
    // Logic: (day + 6) % 7
    const ilkGunIndex = (baslangic.getDay() + 6) % 7;

    // Empty slots
    for (let i = 0; i < ilkGunIndex; i++) {
        takvim.appendChild(document.createElement('div'));
    }

    // Days
    for (let d = new Date(baslangic); d <= bitis; d.setDate(d.getDate() + 1)) {
        const tarihStr = d.toISOString().split('T')[0];
        const gun = d.getDate();
        const dayOfWeek = d.getDay(); // 0=Sun, 6=Sat

        const el = document.createElement('div');
        // Base classes only
        el.className = 'takvim-gunu flex items-center justify-center h-10 w-10 mx-auto rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-transparent';
        el.textContent = gun;

        // Visual Tweaks for Weekend (RED as requested)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            el.classList.add('text-red-600', 'dark:text-red-400', 'font-bold');
        } else {
            el.classList.add('text-slate-700', 'dark:text-slate-200');
        }

        // Apply selected state via CSS class
        if (seciliMazeretGunleri.has(tarihStr)) {
            el.classList.add('mazeret-secili');
            el.title = mazeretAciklamalari[tarihStr] || 'Mazeretli';
        }

        el.onclick = () => mazeretGunuIsle(tarihStr, el);
        takvim.appendChild(el);
    }
}

function mazeretGunuIsle(tarihStr, element) {
    if (seciliMazeretGunleri.has(tarihStr)) {
        // Already selected - just scroll to it in the list (don't delete)
        setTimeout(() => {
            const input = document.getElementById(`aciklama-${tarihStr}`);
            if (input) {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                input.focus();
            }
        }, 50);
    } else {
        // Add new excuse
        seciliMazeretGunleri.add(tarihStr);
        const defaultText = '';
        mazeretAciklamalari[tarihStr] = defaultText;
        element.classList.add('mazeret-secili');
        element.title = defaultText;
        mazeretListesiGuncelle();

        // Auto-focus the new input
        setTimeout(() => {
            const input = document.getElementById(`aciklama-${tarihStr}`);
            if (input) {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                input.focus();
            }
        }, 50);
    }
}

function mazeretKaydet() {
    const p = personeller.find(p => p.id === seciliPersonelId);
    if (p) {
        // Convert Map back to array
        const mazeretArray = [];
        seciliMazeretGunleri.forEach(tarih => {
            mazeretArray.push({
                tarih: tarih,
                tur: 'genel',
                aciklama: mazeretAciklamalari[tarih] || 'Mazeret'
            });
        });

        p.mazeretler = mazeretArray;
        saveToStorage();
        personelListesiniGuncelle();
        uiHelpers.showToast("Mazeretler kaydedildi", "success");
        uiHelpers.closeModal('mazeretModal');
    }
}

// UNUSED: Bulk excuse UI removed, keeping function for potential future use
/*
function mazeretAralikEkle() {
    const baslangic = document.getElementById('mazeretBaslangic').value;
    const bitis = document.getElementById('mazeretBitis').value;
    const aciklama = document.getElementById('mazeretAralikAciklama').value.trim() || 'İzin';

    if (!baslangic || !bitis) {
        return;
    }

    const startDate = new Date(baslangic);
    const endDate = new Date(bitis);

    if (startDate > endDate) {
        return;
    }

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const tarihStr = d.toISOString().split('T')[0];
        seciliMazeretGunleri.add(tarihStr);
        mazeretAciklamalari[tarihStr] = aciklama;
    }

    takvimOlustur();
    mazeretListesiGuncelle();
    console.log(`[Range Added] ${baslangic} to ${bitis} : ${aciklama}`);
}
*/


function mazeretleriTemizle() {
    if (confirm("Bu personelin tüm mazeretlerini silmek istiyor musunuz?")) {
        seciliMazeretGunleri.clear();
        mazeretAciklamalari = {};
        takvimOlustur(); // Refresh view
        mazeretListesiGuncelle();
    }
}

// Export global function to update reason
window.mazeretAciklamaGuncelle = function (tarih, yeniAciklama) {
    mazeretAciklamalari[tarih] = yeniAciklama;
    // Also update title in calendar
    const el = document.querySelector(`.takvim-gunu[onclick*="${tarih}"]`)
        || Array.from(document.querySelectorAll('.takvim-gunu')).find(e => {
            // Approximate match by checking mazeret class and day number if needed, 
            // but direct ID or attribute would be better. TakvimOlustur uses order.
            // Re-rendering calendar is safest.
            return false;
        });

    // Simple way: re-render calendar title tooltips
    takvimOlustur();
    console.log(`Updated ${tarih} to ${yeniAciklama}`);
};

function mazeretListesiGuncelle() {
    const listContainer = document.getElementById('mazeretListesi');
    listContainer.innerHTML = '';

    if (seciliMazeretGunleri.size === 0) {
        listContainer.innerHTML = '<div class="text-center text-slate-400 py-4 italic">Henüz mazeret seçilmedi.<br>Takvimden gün seçin.</div>';
        return;
    }

    // Sort dates
    const sortedDates = Array.from(seciliMazeretGunleri).sort();

    sortedDates.forEach(tarih => {
        const aciklama = mazeretAciklamalari[tarih] || '';

        const dateObj = new Date(tarih);
        const dayOfMonth = dateObj.getDate();
        const monthName = dateObj.toLocaleDateString('tr-TR', { month: 'long' });
        const year = dateObj.getFullYear();
        const fullDateStr = `${dayOfMonth} ${monthName} ${year}`; // 7 Ocak 2026 format

        const item = document.createElement('div');
        item.className = 'bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm border border-slate-200 dark:border-slate-600 relative group transition-all hover:shadow-md';

        item.innerHTML = `
            <button onclick="mazeretSil('${tarih}')" class="absolute top-2 right-2 text-red-500 hover:text-red-600 transition-colors p-1" title="Sil">
                <i class="ri-close-line text-lg"></i>
            </button>
            
            <div class="mb-2 font-bold text-slate-700 dark:text-slate-200 text-sm">
                ${fullDateStr}
            </div>
            
            <div>
                <label class="block text-xs text-slate-500 dark:text-slate-400 mb-1">Mazeret Açıklaması:</label>
                <input type="text" 
                    value="${aciklama}" 
                    id="aciklama-${tarih}"
                    oninput="mazeretAciklamaGuncelle('${tarih}', this.value)"
                    class="w-full text-sm p-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-900 transition-shadow outline-none"
                    placeholder="Açıklama giriniz...">
            </div>
        `;
        listContainer.appendChild(item);
    });

    // Conflict detection disabled
    // mazeretCakismaKontrol();
}

function mazeretCakismaKontrol() {
    const uyariContainer = document.getElementById('mazeretUyarilar');
    if (!uyariContainer) return;

    const uyarilar = [];

    // Get current person's data
    const currentPerson = personeller.find(p => p.id === seciliPersonelId);
    if (!currentPerson) {
        uyariContainer.classList.add('hidden');
        return;
    }

    // Check each selected date for who else has excuses
    const tarihler = Array.from(seciliMazeretGunleri);

    tarihler.forEach(tarih => {
        // Find all OTHER personnel with excuse on this date
        const mazeretliPersoneller = [];

        personeller.forEach(p => {
            if (p.id === currentPerson.id) return; // Skip current person

            if (p.mazeretler && p.mazeretler.some(m => m.tarih === tarih)) {
                mazeretliPersoneller.push(p.ad);
            }
        });

        // If there are conflicts, show them
        if (mazeretliPersoneller.length > 0) {
            const dateObj = new Date(tarih);
            const formatted = dateObj.toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long'
            });

            const toplamPersonel = personeller.length;
            const mazeretliSayisi = mazeretliPersoneller.length + 1; // +1 for current person

            // Determine warning type
            const type = mazeretliSayisi >= toplamPersonel ? 'critical' : 'info';
            const icon = mazeretliSayisi >= toplamPersonel ? '🚫' : 'ℹ️';

            uyarilar.push({
                type: type,
                message: `${icon} <b>${formatted}:</b> ${mazeretliPersoneller.join(', ')} (${mazeretliSayisi}/${toplamPersonel} personel mazeretli)`
            });
        }
    });

    // Display warnings
    if (uyarilar.length > 0) {
        uyariContainer.innerHTML = uyarilar.map(u => {
            let bgColor;
            if (u.type === 'critical') {
                bgColor = 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400';
            } else {
                bgColor = 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400';
            }

            return `<div class="${bgColor} px-3 py-2 rounded-lg border text-xs">${u.message}</div>`;
        }).join('');
        uyariContainer.classList.remove('hidden');
    } else {
        uyariContainer.classList.add('hidden');
    }
}

function mazeretSil(tarih) {
    if (seciliMazeretGunleri.has(tarih)) {
        seciliMazeretGunleri.delete(tarih);
        delete mazeretAciklamalari[tarih];
        // Visual refresh
        const el = document.querySelector(`.takvim-gunu[onclick*="${tarih}"]`)
            || Array.from(document.querySelectorAll('.takvim-gunu')).find(e => e.textContent == new Date(tarih).getDate()); // Fallback finder

        // Better: Just re-render calendar which is fast enough
        takvimOlustur();
        mazeretListesiGuncelle();
    }
}

/**
 * Schedule Generation
 */
function nobetListesiOlustur() {
    if (personeller.length === 0) {
        uiHelpers.showToast("Lütfen önce personel ekleyin!", "error");
        return;
    }

    const loadToast = uiHelpers.showToast("Hesaplanıyor...", "info");

    // Use Advanced Scheduler
    setTimeout(() => {
        const ayarlar = {
            nobetciSayisi: parseInt(document.getElementById('nobetciSayisi').value),
            ustUsteNobetSayisi: parseInt(document.getElementById('ustUsteNobetSayisi').value),
            nobetArasiGun: parseInt(document.getElementById('nobetArasiGun').value),
            haftaSonuAyri: document.getElementById('haftaSonuAyri').checked,
            maxConsec: parseInt(document.getElementById('ustUsteNobetSayisi').value),
            minDaysBetween: parseInt(document.getElementById('nobetArasiGun').value)
        };

        const sonuc = scheduler.generate(personeller, document.getElementById('baslangicTarihi').value, document.getElementById('bitisTarihi').value, ayarlar);

        renderResults(sonuc);

        // Show success if no logical errors
        if (!sonuc[0].warnings || sonuc[0].warnings.length === 0) {
            uiHelpers.showToast("Nöbet listesi başarıyla oluşturuldu!", "success");
        } else {
            uiHelpers.showToast("Liste oluşturuldu ancak bazı kısıtlamalar aşılamadı.", "warning");
        }
    }, 100);
}

function renderResults(schedule) {
    const tbody = document.getElementById('sonucListesi');
    tbody.innerHTML = '';

    schedule.forEach(day => {
        const tr = document.createElement('tr');
        tr.className = `border-b border-slate-100 dark:border-slate-800 ${day.isWeekend ? 'bg-orange-100 dark:bg-orange-900/30 font-semibold' : ''}`;

        let assignments = day.assigned.map(name => `<span class="font-bold text-slate-700 dark:text-slate-200">${name}</span>`).join(', ');

        // Format warnings/mazerets
        let notes = '';
        if (day.warnings && day.warnings.length > 0) {
            notes += `<div class="text-red-500 text-xs">${day.warnings.join(', ')}</div>`;
        }
        if (day.mazerets && day.mazerets.length > 0) {
            day.mazerets.forEach(m => {
                notes += `<div class="text-xs text-slate-400">Mazeretli: ${m.name} (${m.aciklama})</div>`;
            });
        }

        tr.innerHTML = `
            <td class="p-3 text-sm">${day.dateFormatted}</td>
            <td class="p-3 text-sm">${day.dayName}</td>
            <td class="p-3 text-sm">${assignments}</td>
            <td class="p-3 text-sm">${notes}</td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Stats & Utils
 */
function nobetDagilimKontrol() {
    const baslangic = new Date(document.getElementById('baslangicTarihi').value);
    const bitis = new Date(document.getElementById('bitisTarihi').value);
    const count = parseInt(document.getElementById('nobetciSayisi').value) || 1;

    if (isNaN(baslangic) || isNaN(bitis)) return;

    const diffTime = Math.abs(bitis - baslangic);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const totalShifts = diffDays * count;
    const pCount = personeller.length;

    const perPerson = pCount > 0 ? (totalShifts / pCount).toFixed(1) : 0;

    document.getElementById('nobetDurumu').textContent = `${totalShifts} Görev`;
    // Update progress bar to show load
    // HACK: Use existing elements for new enhanced stats
    document.getElementById('nobetDurumu').innerHTML = `${totalShifts} Görev <span class="text-xs font-normal text-slate-500">(Kişi başı ~${perPerson})</span>`;
}

// Wizard Nav
function handleDevamBtn() {
    if (mevcutAdim < adimlar.length - 1) {
        if (mevcutAdim === 0) {
            // Check dates
            const start = document.getElementById('baslangicTarihi').value;
            const end = document.getElementById('bitisTarihi').value;
            if (!start || !end) {
                uiHelpers.showToast("Lütfen tarih adımlarını tamamlayın.", "warning");
                return;
            }
        }

        updateStep(mevcutAdim + 1);
        if (mevcutAdim === 2) {
            nobetListesiOlustur();
        }
    }
}

function handleGeriBtn() {
    if (mevcutAdim > 0) {
        updateStep(mevcutAdim - 1);
    }
}

function updateStep(step) {
    document.getElementById(adimlar[mevcutAdim]).classList.add('hidden');
    document.querySelectorAll('.step-circle')[mevcutAdim].classList.remove('adim-aktif');
    document.querySelectorAll('.step-circle')[mevcutAdim].classList.add('adim-pasif');

    mevcutAdim = step;

    document.getElementById(adimlar[mevcutAdim]).classList.remove('hidden');
    document.querySelectorAll('.step-circle')[mevcutAdim].classList.remove('adim-pasif');
    document.querySelectorAll('.step-circle')[mevcutAdim].classList.add('adim-aktif');

    document.getElementById('geriBtn').classList.toggle('hidden', mevcutAdim === 0);
    document.getElementById('devamBtn').classList.toggle('hidden', mevcutAdim === adimlar.length - 1);
}


// Global Exports for inline onclick handlers
window.personelKaydet = personelKaydet;
window.personelSil = personelSil;
window.personelAdiGuncelle = personelAdiGuncelle;
window.mazeretKaydet = mazeretKaydet;
window.mazeretleriTemizle = mazeretleriTemizle;
window.kapatModal = uiHelpers.closeModal;
window.mazeretSil = mazeretSil;
window.excelAktar = excelAktar;
window.personelDisariAktar = personelDisariAktar;
window.personelIcerikAktar = personelIcerikAktar;


function excelAktar() {
    if (!window.XLSX) {
        uiHelpers.showToast("❌ Excel modülü yüklenemedi", "error");
        return;
    }

    const table = document.getElementById('sonucListesi');
    const rows = Array.from(table.querySelectorAll('tr'));

    if (rows.length === 0) {
        uiHelpers.showToast("⚠️ Önce nöbet listesi oluşturun", "warning");
        return;
    }

    // Sheet 1: Main Schedule (Tarih, Gün, Nöbetçiler)
    const scheduleData = rows.map(row => {
        const cols = row.querySelectorAll('td');
        if (cols.length === 0) return null;

        return {
            "Tarih": cols[0]?.innerText || '-',
            "Gün": cols[1]?.innerText || '-',
            "Nöbetçiler": cols[2]?.innerText || '-'
        };
    }).filter(r => r !== null);


    // Sheet 2: Status Details (Tarih, Gün, Durum)
    const statusData = rows.map(row => {
        const cols = row.querySelectorAll('td');
        if (cols.length === 0) return null;

        return {
            "Tarih": cols[0]?.innerText || '-',
            "Gün": cols[1]?.innerText || '-',
            "Durum": cols[3]?.innerText || '-'
        };
    }).filter(r => r !== null);

    // Create workbook with 2 sheets
    const wb = XLSX.utils.book_new();

    const ws1 = XLSX.utils.json_to_sheet(scheduleData);
    XLSX.utils.book_append_sheet(wb, ws1, "Nöbet Listesi");

    const ws2 = XLSX.utils.json_to_sheet(statusData);
    XLSX.utils.book_append_sheet(wb, ws2, "Durum");

    // Add timestamp to filename
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0];
    XLSX.writeFile(wb, `nobet_listesi_${timestamp}.xlsx`);

    uiHelpers.showToast(`✅ Export tamamlandı: ${scheduleData.length} gün (2 sayfa)`, "success");
}

function personelDisariAktar() {
    if (!window.XLSX) {
        uiHelpers.showToast("❌ Excel modülü yüklenemedi", "error");
        return;
    }

    // Sheet 1: Basic Personnel Info
    const basicData = personeller.map(p => ({
        ID: p.id,
        Ad: p.ad,
        NobetSayisi: p.nobetSayisi,
        HaftaSonu: p.haftaSonuNobetSayisi,
        SonNobet: p.sonNobet || '-',
        UstusteNobet: p.ustusteNobet || 0
    }));

    // Sheet 2: Detailed Excuses
    const mazeretData = [];
    console.log('📊 Personel verisi kontrol ediliyor...');

    personeller.forEach(p => {
        console.log(`  - ${p.ad}: mazeretler =`, p.mazeretler);

        if (p.mazeretler && p.mazeretler.length > 0) {
            p.mazeretler.forEach(m => {
                console.log(`    ✓ Mazeret ekleniyor:`, m);
                mazeretData.push({
                    PersonelID: p.id,
                    PersonelAd: p.ad,
                    MazeretTarihi: m.tarih,
                    Aciklama: m.aciklama || '-',
                    Tur: m.tur || 'genel'
                });
            });
        } else {
            console.log(`    ⊘ Mazeret yok`);
        }
    });

    console.log(`\n📋 Toplam ${mazeretData.length} mazeret bulundu`);

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add basic info sheet
    const ws1 = XLSX.utils.json_to_sheet(basicData);
    XLSX.utils.book_append_sheet(wb, ws1, "Personel");

    // Add excuses sheet if any
    if (mazeretData.length > 0) {
        const ws2 = XLSX.utils.json_to_sheet(mazeretData);
        XLSX.utils.book_append_sheet(wb, ws2, "Mazeretler");
    }

    // Generate filename with timestamp
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0];
    XLSX.writeFile(wb, `personel_listesi_${timestamp}.xlsx`);

    uiHelpers.showToast(`✅ Export tamamlandı: ${personeller.length} personel${mazeretData.length > 0 ? `, ${mazeretData.length} mazeret` : ''}`, "success");
}

function personelIcerikAktar() {
    console.log('📥 Import başlatıldı...');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';

    input.onchange = (e) => {
        const file = e.target.files[0];
        console.log('📄 Dosya seçildi:', file ? file.name : 'YOK');

        if (!file) {
            uiHelpers.showToast("Dosya seçilmedi", "warning");
            return;
        }

        const reader = new FileReader();

        reader.onerror = () => {
            console.error('❌ FileReader hatası');
            uiHelpers.showToast("❌ Dosya okunamadı. Lütfen geçerli bir Excel dosyası seçin.", "error");
        };

        reader.onload = (evt) => {
            console.log('📖 Dosya okundu, işleniyor...');

            try {
                const bstr = evt.target.result;

                // Check XLSX library
                if (!window.XLSX) {
                    console.error('❌ XLSX kütüphanesi bulunamadı');
                    uiHelpers.showToast("❌ Excel modülü yüklenemedi. Sayfayı yenileyin.", "error");
                    return;
                }

                console.log('✓ XLSX kütüphanesi mevcut');
                const wb = XLSX.read(bstr, { type: 'binary' });

                if (!wb.SheetNames || wb.SheetNames.length === 0) {
                    console.error('❌ Excel sheet bulunamadı');
                    uiHelpers.showToast("❌ Excel dosyası boş veya geçersiz", "error");
                    return;
                }

                console.log('✓ Sheets:', wb.SheetNames);
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                console.log('📊 Okunan veri:', data);

                if (!data || data.length === 0) {
                    uiHelpers.showToast("⚠️ Excel dosyasında veri bulunamadı", "warning");
                    return;
                }

                let addedCount = 0;
                let skippedCount = 0;
                const initialCount = personeller.length;

                data.forEach((row, index) => {
                    // Helper: Find column value by partial match (case-insensitive)
                    const findColumn = (keywords) => {
                        const keys = Object.keys(row);
                        for (let keyword of keywords) {
                            const match = keys.find(k =>
                                k.toLowerCase().includes(keyword.toLowerCase())
                            );
                            if (match && row[match] !== undefined) {
                                return row[match];
                            }
                        }
                        return null;
                    };

                    // ZORUNLU: İsim kolonu (en az birini içermeli: ad, name, isim)
                    const name = findColumn(['ad', 'name', 'isim', 'İsim']);

                    // OPSİYONEL: Sayı kolonları (yoksa 0 olur)
                    const nobetSayisi = parseInt(findColumn(['nobet', 'shift', 'duty']) || 0);
                    const haftaSonu = parseInt(findColumn(['hafta', 'weekend', 'sonu']) || 0);

                    console.log(`Satır ${index + 1}:`, row, '→ İsim:', name, 'Nöbet:', nobetSayisi, 'H.Sonu:', haftaSonu);

                    if (!name || name.trim() === '') {
                        console.log(`  ⊘ Atlandı (isim yok veya boş)`);
                        skippedCount++;
                        return;
                    }

                    if (personeller.some(p => p.ad === name.trim())) {
                        console.log(`  ⊘ Atlandı (tekrar): ${name}`);
                        skippedCount++;
                        return;
                    }

                    const newPerson = {
                        id: storage.generateID(),
                        ad: name.trim(),
                        nobetSayisi: nobetSayisi,
                        haftaSonuNobetSayisi: haftaSonu,
                        mazeretler: [],
                        sonNobet: null,
                        ustusteNobet: 0
                    };

                    console.log(`  ✓ Ekleniyor:`, newPerson);
                    personeller.unshift(newPerson);
                    addedCount++;
                });

                console.log(`\n📈 Sonuç: ${addedCount} eklendi, ${skippedCount} atlandı`);
                console.log(`   Önceki: ${initialCount} → Sonraki: ${personeller.length}`);

                // STEP 2: Import Excuses from "Mazeretler" sheet if exists
                let mazeretCount = 0;
                if (wb.SheetNames.includes('Mazeretler')) {
                    console.log('\n📋 Mazeret sheet bulundu, yükleniyor...');
                    const mazeretSheet = wb.Sheets['Mazeretler'];
                    const mazeretData = XLSX.utils.sheet_to_json(mazeretSheet);

                    console.log('📊 Mazeret verisi:', mazeretData);

                    mazeretData.forEach((m, idx) => {
                        // Find matching personnel by ID or name
                        const personelID = m.PersonelID || m.personelID || m.ID;
                        const personelAd = m.PersonelAd || m.personelAd || m.Ad;

                        console.log(`  Mazeret ${idx + 1}: ID=${personelID}, Ad=${personelAd}`);

                        let person = personeller.find(p => p.id === personelID);
                        if (!person && personelAd) {
                            person = personeller.find(p => p.ad === personelAd);
                        }

                        if (person) {
                            if (!person.mazeretler) {
                                person.mazeretler = [];
                            }

                            const mazeretTarihi = m.MazeretTarihi || m.mazeretTarihi || m.Tarih;
                            const aciklama = m.Aciklama || m.aciklama || '-';
                            const tur = m.Tur || m.tur || 'genel';

                            // Check if excuse already exists
                            const exists = person.mazeretler.some(ex => ex.tarih === mazeretTarihi);

                            if (!exists) {
                                person.mazeretler.push({
                                    tarih: mazeretTarihi,
                                    aciklama: aciklama,
                                    tur: tur
                                });
                                mazeretCount++;
                                console.log(`    ✓ Mazeret eklendi: ${personelAd} → ${mazeretTarihi}`);
                            } else {
                                console.log(`    ⊘ Mazeret zaten var: ${mazeretTarihi}`);
                            }
                        } else {
                            console.log(`    ⚠️ Personel bulunamadı: ${personelAd || personelID}`);
                        }
                    });

                    console.log(`\n📋 ${mazeretCount} mazeret yüklendi`);
                } else {
                    console.log('\n⊘ Mazeret sheet bulunamadı');
                }

                personelListesiniGuncelle();
                saveToStorage();
                nobetDagilimKontrol();

                if (addedCount > 0 || mazeretCount > 0) {
                    const msg = [];
                    if (addedCount > 0) msg.push(`${addedCount} personel`);
                    if (mazeretCount > 0) msg.push(`${mazeretCount} mazeret`);
                    if (skippedCount > 0) msg.push(`${skippedCount} atlandı`);
                    uiHelpers.showToast(`✅ Import tamamlandı: ${msg.join(', ')}`, "success");
                } else {
                    uiHelpers.showToast("⚠️ Hiçbir yeni veri eklenmedi", "warning");
                }

            } catch (error) {
                console.error('❌ Import Hatası:', error);
                uiHelpers.showToast(`❌ Import başarısız: ${error.message || 'Bilinmeyen hata'}`, "error");
            }
        };

        console.log('📖 Dosya okunmaya başlıyor...');
        reader.readAsBinaryString(file);
    };

    input.click();
    console.log('🖱️ Dosya seçici açıldı');
}

function tumunuSil() {
    if (personeller.length === 0) {
        uiHelpers.showToast("Silinecek personel yok", "info");
        return;
    }

    if (confirm(`Tüm personeli (${personeller.length} kişi) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) {
        personeller = [];
        personelListesiniGuncelle();
        saveToStorage();
        nobetDagilimKontrol();
        uiHelpers.showToast("Tüm personel silindi", "success");
    }
}

