/**
 * settings.js - 1. bölüm: dönem ve dağıtım esasları + antet/özet rakamları.
 *
 * Form, ayarların tek düzenleyicisidir: her değişiklik state üzerinden işlenir ve
 * buradaki sayılar diğer panellerin dinlediği aynı olaylardan yeniden yazılır.
 */

const settingsPanel = {
    fields: {
        unit: 'unit',
        startDate: 'start',
        endDate: 'end',
        perDay: 'perDay',
        maxConsecutive: 'maxConsecutive',
        minRestDays: 'minRestDays',
        maxTotal: 'maxTotal'
    },

    init() {
        this.fillForm();

        Object.keys(this.fields).forEach((id) => {
            const input = document.getElementById(id);
            input.addEventListener('change', () => this.commit(id, input));
        });

        document.getElementById('splitWeekends').addEventListener('change', (event) => {
            state.setSettings({ splitWeekends: event.target.checked });
            state.touchScheduleValidity();
        });

        // Mazeret görünürlüğü: tek onay kutusu. Dağıtım kuralı olmadığı için
        // listeyi bayatlatmaz; yalnız çizelgenin ve dökümlerin sütununu etkiler.
        document.getElementById('showExcused').addEventListener('change', (event) => {
            state.setSettings({ showExcuses: event.target.checked });
        });

        state.on('settings', () => this.render());
        state.on('personnel', () => this.render());
        state.on('schedule', () => this.render());

        this.render();
    },

    fillForm() {
        const s = state.settings;
        document.getElementById('unit').value = s.unit;
        document.getElementById('startDate').value = s.start;
        document.getElementById('endDate').value = s.end;
        document.getElementById('perDay').value = s.perDay;
        document.getElementById('maxConsecutive').value = s.maxConsecutive;
        document.getElementById('minRestDays').value = s.minRestDays;
        document.getElementById('maxTotal').value = s.maxTotal;
        document.getElementById('splitWeekends').checked = s.splitWeekends;
        document.getElementById('showExcused').checked = s.showExcuses;
        document.getElementById('endDate').min = s.start;
    },

    commit(id, input) {
        const key = this.fields[id];
        const value = key === 'unit' ? input.value.trim() : input.value;

        if (key === 'start') document.getElementById('endDate').min = value;

        state.setSettings({ [key]: value });

        // Değer sınırlandırıldı ya da kırpıldıysa fiilen kullanılan metni/sayıyı göster.
        if (String(state.settings[key]) !== input.value) input.value = state.settings[key];

        // Kural değişikliği, önceden üretilen listeyi geçersiz kılar.
        state.touchScheduleValidity();
    },

    // ---------- Görünüm ----------
    render() {
        const stats = state.stats();

        this.renderHeader(stats);
        this.renderMetrics(stats);

        const notes = this.buildNotes(stats);
        const box = document.getElementById('ruleSummary');

        // Not yoksa boş kap kalmasın: alanın üstünde gereksiz bir bosluk birakirdi.
        box.hidden = notes.length === 0;
        box.replaceChildren(...notes.map(note => this.renderNote(note)));
    },

    /** Antet künyesi: ekranda gizli, yazdırma ve dışa aktarımlarda görünür. */
    renderHeader(stats) {
        const s = state.settings;

        this.set('unitName', s.unit || 'Birim belirtilmedi');
        this.set('periodLabel', stats.dayCount
            ? `${dates.toDisplay(s.start)} – ${dates.toDisplay(s.end)}`
            : 'Dönem seçilmedi');
        this.set('docNo', state.documentNo());
        this.set('preparedDate', dates.toDisplay(dates.today()));
        this.set('perDayLabel', s.perDay);
        // Sürüm etiketi burada yazılmaz: antet ve Hakkında yeter.
    },

    renderMetrics(stats) {
        this.set('mDays', stats.dayCount);
        this.set('mTotal', stats.total);
        this.set('mPerPerson', stats.staffCount ? ui.measure(stats.perPerson) : '—');
        this.set('mWeekend', stats.weekendTotal);
        this.set('mStaff', stats.staffCount);
    },

    /**
     * Yalnizca uyari satirlari üretilir. Gün/toplam/kişi başı/hafta sonu sayilari
     * antet künyesinde, konu satirinda ve 3. sayfadaki özet kutularinda zaten duruyor;
     * kisitlar ise kullanicinin az önce yazdigi form degerleridir - ikisini de tekrar
     * etmemek için bilgi satiri gösterilmez.
     */
    buildNotes(stats) {
        const s = state.settings;
        const notes = [];

        if (!stats.dayCount) {
            notes.push({ tone: 'warn', text: 'Geçerli bir başlangıç ve bitiş tarihi gösterin.' });
        }

        // Boş listede ayrı bir not yok: 2. bölümün boş durum kutusu ne yapılacağını
        // zaten tek yerde söylüyor; burada yinelemek kalabalık olurdu.
        if (stats.notEnoughStaff) {
            notes.push({
                tone: 'danger',
                text: `Vardiya başına ${s.perDay} nöbetçi için personel sayısı yetersiz (${stats.staffCount} kişi).`
            });
        }

        if (stats.overLimit) {
            notes.push({
                tone: 'danger',
                text: `Kişi başı ~${ui.measure(stats.perPerson)} görev, “Maks. Toplam Nöbet” değerini (${s.maxTotal}) aşıyor.`
            });
        }

        return notes;
    },

    renderNote({ tone, text }) {
        const note = ui.create('<div class="note"><span></span></div>');
        note.dataset.tone = tone;
        note.querySelector('span').textContent = text;
        return note;
    },

    set(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }
};
