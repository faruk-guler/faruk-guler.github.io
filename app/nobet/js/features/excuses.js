/**
 * excuses.js - mazeret takvimi penceresi (2. bölümün tamamlayıcısı).
 *
 * Pencere bir kopya üzerinde çalışır (tarih -> açıklama haritası) ve kaydetme
 * state üzerinden yapılır; kaydetmeden kapatmak çalışmayı sessizce atmak yerine işler.
 */

const excuseModal = {
    personId: null,
    selected: new Map(),
    dirty: false,
    month: '',        // "YYYY-MM" currently shown
    range: { start: '', end: '' },

    init() {
        document.getElementById('btnExcuseSave').addEventListener('click', () => this.save());
        document.getElementById('btnExcuseClear').addEventListener('click', () => this.clearAll());
        document.getElementById('btnExcuseRange').addEventListener('click', () => this.addRange());
        document.getElementById('btnPrevMonth').addEventListener('click', () => this.shiftMonth(-1));
        document.getElementById('btnNextMonth').addEventListener('click', () => this.shiftMonth(1));

        const list = document.getElementById('excuseList');
        list.addEventListener('click', (event) => {
            const button = event.target.closest('[data-remove]');
            if (button) this.remove(button.dataset.remove);
        });
        list.addEventListener('input', (event) => {
            const input = event.target.closest('[data-note]');
            if (!input) return;
            this.selected.set(input.dataset.note, input.value);
            this.dirty = true;
        });

        ui.onClose('excuseModal', () => {
            if (this.dirty) this.save();
            else ui.closeModal('excuseModal');
        });
    },

    // ---------- Açılış / kapanış ----------
    open(personId) {
        const person = state.personById(personId);
        if (!person) return;

        const s = state.settings;
        if (!s.start || !s.end || s.start > s.end) {
            ui.toast('Önce geçerli bir tarih aralığı seçin.', 'warn');
            return;
        }

        this.personId = personId;
        this.selected = new Map(person.excuses.map(e => [e.date, e.note]));
        this.dirty = false;
        this.range = { start: s.start, end: s.end };
        this.month = this.firstVisibleMonth();

        document.getElementById('excusePerson').textContent = person.name;
        this.limitRangeInputs();
        this.render();
        this.markFocusTarget();
        ui.openModal('excuseModal');
    },

    /** Klavye ile gelen, pencerenin konusuna dönsün: işaretli güne, yoksa ilk seçilebilir güne. */
    markFocusTarget() {
        const target = document.querySelector('#calendarGrid .cal-day--selected')
            || document.querySelector('#calendarGrid .cal-day:not(.cal-day--out):not(.cal-day--blank)');

        if (target) target.setAttribute('data-autofocus', '');
    },

    /** Aralık alanları dönemin dışına çıkamasın: yanlışlıkla boş bir aralık seçilemez. */
    limitRangeInputs() {
        ['excuseRangeStart', 'excuseRangeEnd'].forEach((id) => {
            const input = document.getElementById(id);
            input.min = this.range.start;
            input.max = this.range.end;
            input.value = '';
        });
        document.getElementById('excuseRangeNote').value = '';
    },

    /** İlk kayıtlı mazeretin ayı gösterilir, yoksa dönemin ilk ayı. */
    firstVisibleMonth() {
        const days = [...this.selected.keys()].sort();
        return (days[0] || this.range.start).slice(0, 7);
    },

    save() {
        const person = state.personById(this.personId);
        if (!person) {
            ui.closeModal('excuseModal');
            return;
        }

        const excuses = [...this.selected.entries()]
            .map(([date, note]) => ({ date, note }))
            .sort((a, b) => a.date.localeCompare(b.date));

        state.setExcuses(person.id, excuses);
        this.dirty = false;

        ui.closeModal('excuseModal');
        ui.toast(excuses.length ? `${excuses.length} mazeret kaydedildi.` : 'Mazeretler kaldırıldı.', 'ok');
        ui.status(`${person.name}: ${excuses.length} mazeret günü`, excuses.length ? 'ok' : 'warn');
    },

    // ---------- Ay gezinme ----------
    shiftMonth(step) {
        const [year, month] = this.month.split('-').map(Number);
        const next = new Date(year, month - 1 + step, 1);
        const iso = dates.toIso(next).slice(0, 7);

        // Planlanan dönem dışında gezinme: seçilebilir günü olmayan ayı göstermenin anlamı yok.
        if (iso < this.range.start.slice(0, 7) || iso > this.range.end.slice(0, 7)) return;

        this.month = iso;
        this.render();
    },

    // ---------- Görünüm ----------
    render() {
        this.renderCalendar();
        this.renderList();
        this.renderConflicts();
    },

    renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const [year, month] = this.month.split('-').map(Number);

        document.getElementById('calendarMonth').textContent =
            dates.formatLong(`${this.month}-01`, { month: 'long', year: 'numeric' });
        document.getElementById('btnPrevMonth').disabled = this.month <= this.range.start.slice(0, 7);
        document.getElementById('btnNextMonth').disabled = this.month >= this.range.end.slice(0, 7);

        // Gün başlıkları sabit markup'tır; yalnız gün hücreleri burada yeniden kurulur.
        grid.replaceChildren();

        const firstDay = dates.weekdayIndex(`${this.month}-01`);
        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement('div');
            blank.className = 'cal-day cal-day--blank';
            grid.append(blank);
        }

        const lastDay = new Date(year, month, 0).getDate();
        for (let day = 1; day <= lastDay; day++) {
            const iso = `${this.month}-${dates.pad2(day)}`;
            const cell = document.createElement('button');
            cell.type = 'button';
            cell.className = 'cal-day';
            cell.textContent = day;

            const selectable = iso >= this.range.start && iso <= this.range.end;
            if (!selectable) {
                cell.classList.add('cal-day--out');
                cell.disabled = true;
            } else {
                const isSelected = this.selected.has(iso);

                // Tıklanabilir her gün bir durum taşır (ekran okuyucu için).
                cell.setAttribute('aria-pressed', String(isSelected));
                if (dates.isWeekend(iso)) cell.classList.add('cal-day--weekend');
                if (isSelected) {
                    cell.classList.add('cal-day--selected');
                    if (this.selected.get(iso)) cell.title = this.selected.get(iso);
                }
                cell.addEventListener('click', () => this.toggle(iso));
            }

            grid.append(cell);
        }
    },

    renderList() {
        const list = document.getElementById('excuseList');
        const days = [...this.selected.keys()].sort();

        document.getElementById('excuseCount').textContent = days.length;

        if (!days.length) {
            list.replaceChildren(this.emptyState());
            return;
        }

        const fragment = document.createDocumentFragment();
        days.forEach(day => fragment.append(this.renderExcuseRow(day)));
        list.replaceChildren(fragment);
    },

    emptyState() {
        return ui.create('<div class="placeholder">Soldaki takvimden mazeret gününü seçin.</div>');
    },

    renderExcuseRow(day) {
        const row = ui.create(`
            <div class="excuse-row">
                <span class="excuse-row__date"></span>
                <button class="btn sm danger" type="button" data-remove title="Günü kaldır">&times;</button>
                <input type="text" placeholder="Açıklama (isteğe bağlı)" data-note>
            </div>`);

        row.querySelector('.excuse-row__date').textContent = `${dates.formatLong(day)} · ${dates.weekdayLong(day)}`;
        row.querySelector('[data-remove]').dataset.remove = day;

        const input = row.querySelector('[data-note]');
        input.dataset.note = day;
        // Uzunluk sınırı tek yerden okunur: Excel'dan gelen kayıtlar da aynı kırpma ile karşılaşır.
        input.maxLength = storage.LIMITS.note;
        input.value = this.selected.get(day) || '';

        return row;
    },

    /** Uyarı, dağıtım çabasında değil seçim anında verilmeli. */
    renderConflicts() {
        const box = document.getElementById('excuseWarnings');
        const perDay = state.settings.perDay;
        const total = state.personnel.length;
        const notes = [];

        [...this.selected.keys()].sort().forEach((day) => {
            // Bu kişinin seçimi kaydedilmemiş olabilir; kayıtlı hâli değil çalışma kopyası sayılır.
            const excused = state.personnel.filter(p =>
                p.id === this.personId ? this.selected.has(day) : state.isExcused(p, day));
            const remaining = total - excused.length;
            const names = excused.map(p => p.name).join(', ');

            if (remaining < perDay) {
                notes.push({
                    tone: 'danger',
                    text: `${dates.formatShort(day)}: ${names} mazeretli, geriye ${remaining} kişi kalıyor (günde ${perDay} nöbetçi gerekiyor).`
                });
            } else if (remaining === perDay) {
                // Tam sınırda: o güne bir mazeret daha eklemek dağılımı kilitler.
                notes.push({
                    tone: 'warn',
                    text: `${dates.formatShort(day)}: ${names} mazeretli, o gün için tam ${remaining} kişi kalıyor — bir mazeret daha dağılımı kilitler.`
                });
            }
        });

        box.hidden = notes.length === 0;
        box.replaceChildren(...notes.map((note) => {
            const node = ui.create('<div class="note"><span></span></div>');
            node.dataset.tone = note.tone;
            node.querySelector('span').textContent = note.text;
            return node;
        }));
    },

    // ---------- Seçim ----------
    /**
     * Aralık ekleme (v3'ten alınan fikir): yıllık izin gibi bitişik günleri tek tek
     * tıklamak yerine başlangıç-bitiş seçilerek işaretlenir.
     */
    addRange() {
        const start = dates.normalize(document.getElementById('excuseRangeStart').value);
        const end = dates.normalize(document.getElementById('excuseRangeEnd').value);
        const note = document.getElementById('excuseRangeNote').value.trim();

        if (!start || !end) return this.reportRange('Aralık için başlangıç ve bitiş tarihi seçin.', 'warn');
        if (start > end) return this.reportRange('Aralık başlangıcı bitiş tarihinden sonra olamaz.', 'warn');

        // Dönem dışına taşan günler sessizce değil, söylenerek kırpılır.
        const requested = dates.list(start, end);
        const days = requested.filter(day => day >= this.range.start && day <= this.range.end);
        const outside = requested.length - days.length;

        if (!days.length) return this.reportRange('Seçilen aralık bu döneme hiç denk gelmiyor.', 'warn');

        let added = 0;
        days.forEach((day) => {
            if (this.selected.has(day)) return;
            this.selected.set(day, note);
            added++;
        });

        this.dirty = true;
        this.render();
        this.limitRangeInputs();

        const skipped = outside ? ` · ${outside} gün dönem dışında kaldı` : '';
        this.reportRange(`${added} gün eklendi, ${days.length - added} gün zaten işaretliydi${skipped}.`, 'ok');
    },

    reportRange(message, tone) {
        ui.toast(message, tone);
        ui.status(message, tone);
    },

    toggle(day) {
        if (this.selected.has(day)) this.remove(day);
        else {
            this.selected.set(day, '');
            this.dirty = true;
            this.render();
        }
    },

    remove(day) {
        if (!this.selected.has(day)) return;
        this.selected.delete(day);
        this.dirty = true;
        this.render();
    },

    async clearAll() {
        if (!this.selected.size) return;

        const answer = await ui.confirm({
            title: 'Mazeretleri temizle',
            message: `${this.selected.size} mazeret günü silinsin mi?`,
            okText: 'Sil',
            danger: true
        });

        if (!answer) return;

        this.selected.clear();
        this.dirty = true;
        this.render();
    }
};
