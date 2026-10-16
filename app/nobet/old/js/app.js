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

    // Fix timezone offset issue for local date string
    const offset = bugun.getTimezoneOffset() * 60000;
    const bugunStr = new Date(bugun.getTime() - offset).toISOString().split('T')[0];
    const birAySonraStr = new Date(birAySonra.getTime() - offset).toISOString().split('T')[0];

    // Set inputs if empty
    const startInput = document.getElementById('baslangicTarihi');
    const endInput = document.getElementById('bitisTarihi');

    if (!startInput.value) startInput.value = bugunStr;
    startInput.min = bugunStr;

    if (!endInput.value) endInput.value = birAySonraStr;
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
    const inputs = ['baslangicTarihi', 'bitisTarihi', 'nobetciSayisi', 'ustUsteNobetSayisi', 'nobetArasiGun', 'haftaSonuAyri', 'maxShifts', 'listeBasligi'];
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
    document.getElementById('sablonIndirBtn').addEventListener('click', sablonIndir);
    document.getElementById('tumunuSilBtn').addEventListener('click', tumunuSil);
    document.getElementById('pdfAktarBtn').addEventListener('click', pdfAktar);
    document.getElementById('analizBtn').addEventListener('click', () => {
        uiHelpers.openModal('analizModal');
        setTimeout(renderCharts, 200);
    });

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
        haftaSonuAyri: document.getElementById('haftaSonuAyri').checked,
        maxShifts: document.getElementById('maxShifts').value,
        listeBasligi: document.getElementById('listeBasligi').value
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
        document.getElementById('maxShifts').value = savedAyarlar.maxShifts || 0;
        document.getElementById('listeBasligi').value = savedAyarlar.listeBasligi || '';
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
        // Toggle off: Remove excuse if clicked again
        mazeretSil(tarihStr);
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

    // Conflict detection enabled
    mazeretCakismaKontrol();
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

            const nobetciSayisi = Math.max(1, parseInt(document.getElementById('nobetciSayisi').value) || 1);
            const kalanPersonel = toplamPersonel - mazeretliSayisi;

            // Determine warning type: Critical if not enough people available for the shift
            const type = kalanPersonel < nobetciSayisi ? 'critical' : 'info';
            const icon = kalanPersonel < nobetciSayisi ? '🚫' : 'ℹ️';

            uyarilar.push({
                type: type,
                message: `${icon} <b>${formatted}:</b> ${mazeretliPersoneller.join(', ')} (${mazeretliSayisi}/${toplamPersonel} personel mazeretli) ${type === 'critical' ? '<b> - Yetersiz Personel!</b>' : ''}`
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

    const count = parseInt(document.getElementById('nobetciSayisi').value) || 1;
    if (count > personeller.length) {
        uiHelpers.showToast(`Vardiya başına kişi sayısı (${count}), toplam personel sayısından (${personeller.length}) büyük olamaz!`, "error");
        return;
    }

    const start = document.getElementById('baslangicTarihi').value;
    const end = document.getElementById('bitisTarihi').value;

    if (!start || !end) {
        uiHelpers.showToast("Lütfen başlangıç ve bitiş tarihlerini seçin!", "warning");
        return;
    }

    if (new Date(start) > new Date(end)) {
        uiHelpers.showToast("Başlangıç tarihi bitiş tarihinden sonra olamaz!", "error");
        return;
    }

    // Yeni toast sistemi çoklu mesajları destekler, sıfırlamaya gerek yok.
    setTimeout(() => {
        const ayarlar = {
            nobetciSayisi: Math.max(1, parseInt(document.getElementById('nobetciSayisi').value) || 1),
            maxConsec: Math.max(1, parseInt(document.getElementById('ustUsteNobetSayisi').value) || 2), // Floor to 1
            minDaysBetween: Math.max(0, parseInt(document.getElementById('nobetArasiGun').value) || 0),
            haftaSonuAyri: document.getElementById('haftaSonuAyri').checked,
            maxShifts: Math.max(0, parseInt(document.getElementById('maxShifts').value) || 0)
        };

        const response = scheduler.generate(personeller, document.getElementById('baslangicTarihi').value, document.getElementById('bitisTarihi').value, ayarlar);

        if (response.success) {
            mevcutListe = response.schedule; // Store globally for manual overrides
            renderResults(mevcutListe);
            document.getElementById('sonucButonlari').classList.remove('hidden');
            uiHelpers.showToast("Nöbet listesi başarıyla oluşturuldu!", "success");
        } else {
            console.error("Scheduler Error:", response.analysis);
            uiHelpers.showToast(response.error + " " + response.analysis, "error");
            
            // Render a clear error in the table
            const tbody = document.getElementById('sonucListesi');
            tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-red-500 font-bold bg-red-50 dark:bg-red-900/10">
                <i class="ri-error-warning-fill text-4xl mb-2 block"></i>
                ${response.error}<br>
                <span class="text-sm font-normal">${response.analysis}</span>
            </td></tr>`;
            document.getElementById('sonucOzet').classList.add('hidden');
            document.getElementById('sonucButonlari').classList.add('hidden');
        }
    }, 100);
}

let mevcutListe = []; // Global result storage

function renderResults(schedule) {
    const tbody = document.getElementById('sonucListesi');
    tbody.innerHTML = '';

    // Initialize summary data with historical stats
    const ozetData = {};
    personeller.forEach(p => {
        ozetData[p.id] = { 
            ad: p.ad, 
            total: (p.nobetSayisi || 0), 
            weekend: (p.haftaSonuNobetSayisi || 0) 
        };
    });

    schedule.forEach((day, dayIdx) => {
        const tr = document.createElement('tr');
        tr.className = `border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${day.isWeekend ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''}`;

        const assignments = day.assigned.map((p, pIdx) => {
            // Update summary
            if (ozetData[p.id]) {
                ozetData[p.id].total++;
                if (day.isWeekend) ozetData[p.id].weekend++;
            }
            
            return `<span class="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group" 
                          onclick="overrideAc('${day.date}', ${pIdx}, '${p.id}', '${p.ad}')"
                          title="Değiştirmek için tıkla">
                       ${p.ad}
                       <i class="ri-arrow-up-down-line text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                     </span>`;
        }).join(' ');

        let notes = '';
        if (day.mazerets && day.mazerets.length > 0) {
            day.mazerets.forEach(m => {
                const desc = m.aciklama && m.aciklama !== '-' && m.aciklama.trim() !== '' ? ` (${m.aciklama})` : '';
                notes += `<div class="text-[10px] text-slate-400 leading-tight">Mazeretli: ${m.name}${desc}</div>`;
            });
        }

        tr.innerHTML = `
            <td class="p-3 text-sm whitespace-nowrap">${day.dateFormatted}</td>
            <td class="p-3 text-sm font-medium ${day.isWeekend ? 'text-red-600 dark:text-red-400' : 'text-slate-500'}">${day.dayName}</td>
            <td class="p-3 text-sm"><div class="flex flex-wrap gap-2">${assignments}</div></td>
            <td class="p-3 text-sm">${notes}</td>
        `;
        tbody.appendChild(tr);
    });

    renderSummary(ozetData);
}

function renderSummary(data) {
    const ozetEl = document.getElementById('sonucOzet');
    ozetEl.innerHTML = '';
    ozetEl.classList.remove('hidden');

    // Find most/least load
    const stats = Object.values(data).filter(p => p.total > 0);
    if (stats.length === 0) { ozetEl.classList.add('hidden'); return; }

    const sorted = [...stats].sort((a, b) => b.total - a.total);
    
    // Create cards for top 4 people with most shifts as a sample, or all if small
    stats.sort((a,b) => b.total - a.total).forEach(p => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-center relative overflow-hidden group';
        card.innerHTML = `
            <div class="absolute -right-2 -bottom-2 text-slate-100 dark:text-slate-700/50 group-hover:text-blue-50 dark:group-hover:text-blue-900/20 transition-colors">
                <i class="ri-user-star-line text-6xl"></i>
            </div>
            <div class="relative z-10">
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">${p.ad}</div>
                <div class="flex items-end gap-2">
                    <div class="flex flex-col">
                        <span class="text-2xl font-black text-blue-600 dark:text-blue-400">${p.total}</span>
                        <span class="text-[10px] text-slate-500 font-bold uppercase">Toplam</span>
                    </div>
                    <div class="ml-auto flex flex-col items-end">
                        <div class="text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full text-xs font-bold flex items-center">
                            <i class="ri-sun-line mr-1"></i>${p.weekend}
                        </div>
                        <span class="text-[10px] text-slate-500 font-bold uppercase mt-1">H.Sonu</span>
                    </div>
                </div>
            </div>
        `;
        ozetEl.appendChild(card);
    });
}

// Manual Override Logic
let overrideState = { date: null, pIdx: null, currentId: null };

window.overrideAc = function(date, pIdx, id, ad) {
    overrideState = { date, pIdx, currentId: id };
    document.getElementById('degistirBilgi').innerHTML = `<b>${date}</b> tarihindeki <b>${ad}</b> yerine kim gelsin?`;
    
    const select = document.getElementById('yeniNobetciSelect');
    select.innerHTML = '';

    // Convert DD.MM.YYYY passed from UI to YYYY-MM-DD for database comparison
    const targetDateIso = date.includes('.') ? date.split('.').reverse().join('-') : date;

    // List ONLY eligible candidates (exclude mazeretlers and current person)
    personeller.forEach(p => {
        if (p.id === id) return;
        
        // Check if person has an excuse for this specific date
        const isMazeretli = p.mazeretler && p.mazeretler.some(m => {
            const mDate = m.tarih.includes('.') ? m.tarih.split('.').reverse().join('-') : m.tarih;
            return mDate === targetDateIso;
        });

        if (!isMazeretli) {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.ad;
            select.appendChild(opt);
        }
    });

    uiHelpers.openModal('degistirModal');

    // Hard block logic for excuses
    const confirmBtn = document.getElementById('degistirOnayBtn');
    const warning = document.getElementById('mazeretUyari');
    
    confirmBtn.disabled = true; // Default disabled until a valid person is selected
    
    select.onchange = () => {
        const val = select.value;
        if (!val) {
            confirmBtn.disabled = true;
            warning.classList.add('hidden');
            return;
        }

        const person = personeller.find(p => p.id === val);
        const targetDateIso = date.includes('.') ? date.split('.').reverse().join('-') : date;

        // 1. Check Excuse (Hard Block)
        const isExcused = person && person.mazeretler && person.mazeretler.some(m => {
            const mDate = m.tarih.includes('.') ? m.tarih.split('.').reverse().join('-') : m.tarih;
            return mDate === targetDateIso;
        });

        if (isExcused) {
            warning.classList.remove('hidden', 'bg-yellow-100', 'text-yellow-800', 'dark:bg-yellow-900/20', 'dark:text-yellow-400');
            warning.classList.add('bg-red-100', 'text-red-800', 'dark:bg-red-900/20', 'dark:text-red-400');
            warning.innerHTML = `<i class="ri-error-warning-fill"></i> <b>YASAK:</b> ${person.ad} bu tarihte mazeretli!`;
            confirmBtn.disabled = true;
            confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
            return;
        }

        // 2. Check Same Day Conflict (Hard Block)
        const day = mevcutListe.find(d => d.date === date);
        const alreadyInDay = day && day.assigned.some(a => a.id === val);
        if (alreadyInDay) {
            warning.classList.remove('hidden', 'bg-yellow-100', 'text-yellow-800', 'dark:bg-yellow-900/20', 'dark:text-yellow-400');
            warning.classList.add('bg-red-100', 'text-red-800', 'dark:bg-red-900/20', 'dark:text-red-400');
            warning.innerHTML = `<i class="ri-error-warning-fill"></i> <b>HATA:</b> ${person.ad} bu gün zaten nöbetçi!`;
            confirmBtn.disabled = true;
            confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
            return;
        }

        // 3. Check Consecutive Day (Soft Warning)
        let isConsecutive = false;
        const currentIdx = mevcutListe.findIndex(d => d.date === date);
        if (currentIdx > 0) {
            const prevDay = mevcutListe[currentIdx - 1];
            if (prevDay.assigned.some(a => a.id === val)) isConsecutive = true;
        }
        if (currentIdx < mevcutListe.length - 1) {
            const nextDay = mevcutListe[currentIdx + 1];
            if (nextDay.assigned.some(a => a.id === val)) isConsecutive = true;
        }

        if (isConsecutive) {
            warning.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'dark:bg-red-900/20', 'dark:text-red-400');
            warning.classList.add('bg-yellow-100', 'text-yellow-800', 'dark:bg-yellow-900/20', 'dark:text-yellow-400');
            warning.innerHTML = `<i class="ri-information-fill"></i> <b>UYARI:</b> ${person.ad} bir önceki veya bir sonraki gün nöbetçi.`;
            confirmBtn.disabled = false;
            confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            warning.classList.add('hidden');
            confirmBtn.disabled = false;
            confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    };
};

// Removed istatistikleriIsle

document.getElementById('degistirOnayBtn').addEventListener('click', () => {
    const selectedId = document.getElementById('yeniNobetciSelect').value;
    const selectedPerson = personeller.find(p => p.id === selectedId);
    
    if (selectedPerson) {
        const day = mevcutListe.find(d => d.date === overrideState.date);
        if (day) {
            day.assigned[overrideState.pIdx] = { id: selectedPerson.id, ad: selectedPerson.ad };
            renderResults(mevcutListe);
            uiHelpers.closeModal('degistirModal');
            uiHelpers.showToast("Nöbetçi başarıyla değiştirildi", "success");
        }
    }
});

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

    // Calculate weekend shifts in the range
    let weekendShifts = 0;
    let current = new Date(baslangic);
    while (current <= bitis) {
        if (current.getDay() === 0 || current.getDay() === 6) {
            weekendShifts += count;
        }
        current.setDate(current.getDate() + 1);
    }

    document.getElementById('nobetDurumu').innerHTML = `${totalShifts} Görev <span class="text-xs font-normal text-slate-500">(Kişi başı ~${perPerson})</span>`;
    document.getElementById('haftaSonuNobetDurumu').textContent = `${weekendShifts} Görev`;
}

// Wizard Nav
function handleDevamBtn() {
    if (mevcutAdim === 0) {
        const startInput = document.getElementById('baslangicTarihi').value;
        const endInput = document.getElementById('bitisTarihi').value;
        
        if (!startInput || !endInput) {
            uiHelpers.showToast("Lütfen tarih adımlarını tamamlayın.", "warning");
            return;
        }

        if (new Date(endInput) < new Date(startInput)) {
            uiHelpers.showToast("Bitiş tarihi başlangıçtan önce olamaz!", "error");
            return;
        }
        updateStep(1);
    } else if (mevcutAdim === 1) {
        if (personeller.length === 0) {
            uiHelpers.showToast("Lütfen önce personel ekleyin!", "warning");
            return;
        }
        updateStep(2);
        nobetListesiOlustur();
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
window.pdfAktar = pdfAktar;
window.personelDisariAktar = personelDisariAktar;
window.personelIcerikAktar = personelIcerikAktar;
window.sablonIndir = sablonIndir;
window.renderCharts = renderCharts;

function sablonIndir() {
    if (!window.XLSX) {
        uiHelpers.showToast("❌ Excel modülü yüklenemedi", "error");
        return;
    }

    // Sheet 1: Personel
    const data = [
        { "Ad Soyad": "Ahmet Yilmaz", "Nobet Sayisi": 0, "Hafta Sonu": 0 },
        { "Ad Soyad": "Ayse Demir", "Nobet Sayisi": 0, "Hafta Sonu": 0 }
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Personel");

    // Sheet 2: Mazeretler
    const mazeretData = [
        { "PersonelAd": "Ahmet Yilmaz", "MazeretTarihi": "2026-05-15", "Aciklama": "Kongre", "Tur": "genel" }
    ];
    const ws2 = XLSX.utils.json_to_sheet(mazeretData);
    XLSX.utils.book_append_sheet(wb, ws2, "Mazeretler");

    XLSX.writeFile(wb, "genel_nobet_sablonu.xlsx");
    uiHelpers.showToast("Örnek şablon (2 Sayfalı) indirildi", "success");
}


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

    const customTitle = document.getElementById('listeBasligi').value || ".......... Birimi Nöbet Çizelgesi";
    const startDate = document.getElementById('baslangicTarihi').value.split('-').reverse().join('.');
    const endDate = document.getElementById('bitisTarihi').value.split('-').reverse().join('.');
    const dateRange = `Nöbet Aralığı: ${startDate} - ${endDate}`;

    // Create the main sheet starting from Row 4 to leave room for headers
    const ws1 = XLSX.utils.json_to_sheet(scheduleData, { origin: "A4" }); 
    
    // Add Headers (Row 1 and 2)
    XLSX.utils.sheet_add_aoa(ws1, [[customTitle]], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(ws1, [[dateRange]], { origin: "A2" });

    // Add Signature Area at the end
    const lastRowIdx = scheduleData.length + 5; // A4 + data length + 2 spacing
    XLSX.utils.sheet_add_aoa(ws1, [
        [""],
        ["", "", "__________________________"],
        ["", "", "İmza / Kaşe"]
    ], { origin: `A${lastRowIdx}` });
    
    ws1['!cols'] = [{ wch: 15 }, { wch: 12 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, ws1, "Nöbet Listesi");

    const ws2 = XLSX.utils.json_to_sheet(statusData);
    ws2['!cols'] = [{ wch: 15 }, { wch: 12 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, ws2, "Durum");

    // Add timestamp to filename
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0];
    XLSX.writeFile(wb, `nobet_listesi_${timestamp}.xlsx`);

    uiHelpers.showToast(`✅ Export tamamlandı: ${scheduleData.length} gün (2 sayfa)`, "success");
}

function pdfAktar() {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
        uiHelpers.showToast("❌ PDF modülü yüklenemedi", "error");
        return;
    }

    const doc = new jsPDF();
    const table = document.getElementById('sonucListesi');
    const rows = Array.from(table.querySelectorAll('tr'));

    if (rows.length === 0) {
        uiHelpers.showToast("⚠️ Önce nöbet listesi oluşturun", "warning");
        return;
    }

    // Helper: Fix Turkish characters for standard PDF fonts (since they don't support Unicode by default)
    const fixTr = (text) => {
        if (!text) return "";
        return text
            .replace(/İ/g, "I").replace(/ı/g, "i")
            .replace(/Ğ/g, "G").replace(/ğ/g, "g")
            .replace(/Ü/g, "U").replace(/ü/g, "u")
            .replace(/Ş/g, "S").replace(/ş/g, "s")
            .replace(/Ö/g, "O").replace(/ö/g, "o")
            .replace(/Ç/g, "C").replace(/ç/g, "c");
    };

    // Title & Metadata (Handled by didDrawPage for consistency across all pages)
    // We only need to set the startY for the table
    
    // Filtered Data: Exclude the 4th column (Status/Mazeret) for privacy
    const pdfData = rows.map(row => {
        const cols = row.querySelectorAll('td');
        return [
            fixTr(cols[0]?.innerText || '-'),
            fixTr(cols[1]?.innerText || '-'),
            fixTr(cols[2]?.innerText || '-')
            // Column 3 (Durum) is intentionally skipped for privacy
        ];
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // Final and robust PDF generation using didDrawPage hook
    doc.autoTable({
        startY: 35,
        head: [[fixTr('Tarih'), fixTr('Gun'), fixTr('Nobetciler')]],
        body: pdfData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [241, 245, 249] },
        styles: { 
            font: 'helvetica', 
            fontSize: 8, 
            cellPadding: 1.5,
            overflow: 'linebreak'
        },
        columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 25 },
            2: { cellWidth: 'auto' }
        },
        margin: { top: 35, bottom: 15 }, // Top margin increased to accommodate header on every page
        didDrawPage: (data) => {
            // Draw custom title and metadata on EVERY page
            const customTitle = document.getElementById('listeBasligi').value || ".......... Birimi Nobet Cizelgesi";
            const startDate = document.getElementById('baslangicTarihi').value.split('-').reverse().join('.');
            const endDate = document.getElementById('bitisTarihi').value.split('-').reverse().join('.');

            doc.setFontSize(18);
            doc.text(fixTr(customTitle), 14, 20);
            doc.setFontSize(10);
            doc.text(fixTr(`Nobet Araligi: ${startDate} - ${endDate}`), 14, 28);

            // Add Page Numbers
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.text(fixTr(`Sayfa ${data.pageNumber}`), pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
        }
    });

    // Add signature area at the end of the document
    const finalY = doc.lastAutoTable.finalY || 150;
    
    // Check if there is enough space on the current page for signature (need ~40mm)
    let signatureY = finalY + 20;
    if (signatureY > doc.internal.pageSize.getHeight() - 30) {
        doc.addPage();
        signatureY = 30; // Start at top of new page if no space
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    const signatureText = fixTr("Imza / Kase");
    const signatureLine = "__________________________";
    
    // Right aligned signature
    doc.text(signatureLine, pageWidth - 60, signatureY);
    doc.text(signatureText, pageWidth - 47, signatureY + 7);
    doc.setFont("helvetica", "normal");

    // Open in new tab instead of downloading
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0];
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    uiHelpers.showToast("✅ PDF (Yeni Sekme) başarıyla hazırlandı", "success");
}

let myChart = null;
function renderCharts() {
    const ctx = document.getElementById('loadChart').getContext('2d');
    
    if (myChart) {
        myChart.destroy();
    }

    // Calculate combined load (History + Current Schedule)
    const combinedData = personeller.map(p => {
        let total = (p.nobetSayisi || 0);
        let weekend = (p.haftaSonuNobetSayisi || 0);

        // Add current schedule load
        mevcutListe.forEach(day => {
            if (day.assigned.some(a => a.id === p.id)) {
                total++;
                if (day.isWeekend) weekend++;
            }
        });

        return { ad: p.ad, total, weekend };
    });

    const labels = combinedData.map(d => d.ad);
    const totalData = combinedData.map(d => d.total);
    const weekendData = combinedData.map(d => d.weekend);

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#e2e8f0' : '#1e293b';

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Toplam Nöbet',
                    data: totalData,
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',
                    borderColor: 'rgb(37, 99, 235)',
                    borderWidth: 1
                },
                {
                    label: 'Hafta Sonu',
                    data: weekendData,
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: 'rgb(245, 158, 11)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: textColor }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: textColor },
                    grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { display: false }
                }
            }
        }
    });
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
                const wb = XLSX.read(bstr, { type: 'binary', cellDates: true });

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

                    // ZORUNLU: İsim kolonu
                    const name = findColumn(['ad', 'name', 'isim', 'İsim', 'personel', 'person']);

                    // OPSİYONEL: Sayı kolonları
                    const nobetSayisi = parseInt(findColumn(['nobet', 'shift', 'duty', 'sayı', 'count']) || 0);
                    const haftaSonu = parseInt(findColumn(['hafta', 'weekend', 'sonu', 'cumartesi', 'pazar']) || 0);

                    console.log(`Satır ${index + 1}:`, row, '→ İsim:', name, 'Nöbet:', nobetSayisi, 'H.Sonu:', haftaSonu);

                    if (!name || name.trim() === '') {
                        skippedCount++;
                        return;
                    }

                    if (personeller.some(p => p.ad === name.trim())) {
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

                            let mazeretTarihi = m.MazeretTarihi || m.mazeretTarihi || m.Tarih;
                            
                            // Date Normalization (If it's a JS Date object from SheetJS)
                            if (mazeretTarihi instanceof Date) {
                                // Fix timezone offset for imported dates
                                const offset = mazeretTarihi.getTimezoneOffset() * 60000;
                                mazeretTarihi = new Date(mazeretTarihi.getTime() - offset).toISOString().split('T')[0];
                            } else if (typeof mazeretTarihi === 'string' && (mazeretTarihi.includes('.') || mazeretTarihi.includes('/'))) {
                                // Handle DD.MM.YYYY or DD/MM/YYYY
                                const dateStr = mazeretTarihi.replace(/\//g, '.');
                                const parts = dateStr.split('.');
                                if (parts.length === 3) {
                                    mazeretTarihi = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                                }
                            }

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


