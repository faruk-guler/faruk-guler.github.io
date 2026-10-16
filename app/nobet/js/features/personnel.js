/**
 * personnel.js - 2. bölüm: personel beyanı tablosu.
 *
 * Satırlar sabit şablondan üretilir, kullanıcı metni yalnızca property ile yazılır
 * (HTML'e asla interpolation yapılmaz); tüm tıklamalar tek devredilen dinleyiciyle okunur.
 */

const personnelPanel = {
    pendingRender: false,

    /** Devir haneleri: etiketler tablo başlıklarıyla, alan adları state.setCarried ile hizalı. */
    CARRIED: {
        shifts: { label: 'Devir', hint: 'Önceki dönemden devreden toplam nöbet' },
        weekends: { label: 'Devir hafta sonu', hint: 'Önceki dönemden devreden hafta sonu nöbeti' }
    },

    init() {
        this.table = document.getElementById('personnelTable');
        this.list = document.getElementById('personnelList');
        this.empty = document.getElementById('personnelEmpty');
        this.note = document.getElementById('devirNote');

        document.getElementById('btnAddPerson').addEventListener('click', () => this.openModal());
        document.getElementById('btnSavePerson').addEventListener('click', () => this.save());
        document.getElementById('btnClearAll').addEventListener('click', () => this.clearAll());
        document.getElementById('personName').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') this.save();
        });

        this.list.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-act]');
            if (!trigger) return;

            const id = trigger.closest('tr').dataset.id;
            if (trigger.dataset.act === 'excuse') excuseModal.open(id);
            if (trigger.dataset.act === 'remove') this.remove(id);
        });

        // Satır içi düzeltme (ad ve devir sayıları): yalnızca düzenlenebilir hücre kaydeder,
        // düğmeler değil. Kayıt bir sonraya bırakılır: focusout sırasında yeni hücre henüz
        // odaklanmamıştır; tabloyu hemen yeniden kurmak o hücreyi yok edip odağı gövdeye düşürürdü.
        this.list.addEventListener('focusout', (event) => {
            const cell = event.target.closest('[data-rename],[data-count]');
            if (!cell) return;

            const row = cell.closest('tr');
            const id = row.dataset.id;
            const field = cell.dataset.count || null;
            const draft = cell.textContent;

            setTimeout(() => {
                if (field) this.saveCount(id, field, draft);
                else this.rename(id, draft);

                if (this.pendingRender) {
                    this.pendingRender = false;
                    this.render();
                }
            }, 0);
        });

        // Enter hücreden çıkar: çıkmak kaydetmek demektir. Shift+Enter de aynı şeydir,
        // tek satırlık değerde <br> birikmesin. Ctrl+Enter ayrıdır: liste üretir, metin kalmalı.
        this.list.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' || event.ctrlKey || event.metaKey) return;

            const cell = event.target.closest('[data-rename],[data-count]');
            if (cell) {
                event.preventDefault();
                cell.blur();
            }
        });

        // Sayı hanesine tıklandığında mevcut değer seçilir: yazılan onun yerine geçer
        // (tablo/Excel alışkanlığı). Ad hanesinde imlecin araya girmesi doğrudur, o karışmaz.
        this.list.addEventListener('focusin', (event) => {
            if (!event.target.closest('[data-count]')) return;

            const cell = event.target;
            // Tıklama imleci yerleştirdikten sonra seçebilmek için bir sonraya bırakılır.
            setTimeout(() => {
                if (document.activeElement !== cell) return;

                const range = document.createRange();
                range.selectNodeContents(cell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }, 0);
        });

        // Yapıştırılan metin zengin biçimli gelebilir (kalın, renkli): hücre düz metin almalı.
        this.list.addEventListener('paste', (event) => {
            const cell = event.target.closest('[data-rename],[data-count]');
            if (!cell) return;

            event.preventDefault();
            const text = event.clipboardData.getData('text/plain');
            // Sayı hanesi yapıştırılan metinden de yalnız rakam alır.
            const clean = cell.dataset.count ? text.replace(/[^\d]/g, '') : text.replace(/\s+/g, ' ');
            if (!document.execCommand('insertText', false, clean)) cell.textContent = clean;
        });

        state.on('personnel', () => this.render());
        state.on('schedule', () => this.render());
        this.render();
    },

    /** Sayılar state.rank() üzerinden gelir; üretilmiş liste de hesaba katılmış olur. */
    render() {
        // Bir hücre düzenlenirken tabloyu yıkmak yazılanı siler (ör. düzenleme
        // üstüne Ctrl+Enter). Hücreden çıkınca focusout zaten kaydedip çizerdir.
        if (this.list.contains(document.activeElement)) {
            this.pendingRender = true;
            return;
        }

        const loads = new Map(state.rank().map(item => [item.id, item]));

        document.getElementById('personnelCount').textContent = state.personnel.length;

        // Boş listede tablo başlıkları da görünsün istenmez; devir notu da ancak
        // düzenlenecek bir satır varsa anlam taşır.
        this.table.hidden = state.personnel.length === 0;
        this.empty.hidden = state.personnel.length > 0;
        this.note.hidden = this.table.hidden;

        const fragment = document.createDocumentFragment();
        state.personnel.forEach((person, index) => fragment.append(this.renderRow(person, loads.get(person.id), index)));
        this.list.replaceChildren(fragment);
    },

    renderRow(person, load, index) {
        const row = ui.create(`
            <tr>
                <td class="cell-idx t-num"></td>
                <td><span class="name-edit" role="textbox" aria-multiline="false" contenteditable="true" spellcheck="false" data-rename></span></td>
                <td class="cell-num t-num"><span class="count-edit" role="textbox" aria-multiline="false" contenteditable="true" spellcheck="false" inputmode="numeric" data-count="shifts"></span></td>
                <td class="cell-num t-num"><span class="count-edit" role="textbox" aria-multiline="false" contenteditable="true" spellcheck="false" inputmode="numeric" data-count="weekends"></span></td>
                <td class="cell-num t-num cell-total"></td>
                <td class="cell-num t-num cell-weekend"></td>
                <td class="cell-excuse"></td>
                <td class="cell-actions no-print"></td>
            </tr>`);

        row.dataset.id = person.id;
        row.querySelector('.cell-idx').textContent = index + 1;

        const nameCell = row.querySelector('[data-rename]');
        nameCell.dataset.rename = person.id;
        nameCell.textContent = person.name;

        this.renderCount(row, 'shifts', person.shifts);
        this.renderCount(row, 'weekends', person.weekends);

        const total = load ? load.total : person.shifts;
        const weekend = load ? load.weekend : person.weekends;

        row.querySelector('.cell-total').textContent = total;
        row.querySelector('.cell-weekend').textContent = weekend;

        this.renderExcuseCell(row.querySelector('.cell-excuse'), person);
        this.renderActions(row.querySelector('.cell-actions'), person);

        return row;
    },

    /**
     * Devir hanesi: boşsa çizgi gösterilir, ama düzenlerken 0 olarak okunur.
     * Açıklama fareyle üzerine gelme metni (title) olarak DEĞİL, 2. sayfadaki
     * anahtarın altındaki kalıcı not olarak verilir; burada yalnızca ekran
     * okuyucu için etiket kalır.
     */
    renderCount(row, field, value) {
        const cell = row.querySelector(`[data-count="${field}"]`);
        cell.textContent = value || '—';
        cell.setAttribute('aria-label', `${this.CARRIED[field].hint} (devir)`);
        return cell;
    },

    /** ID'yi seçiciye koymak yerine veriden oku: ID'de tırnak/özel karakter olabilir. */
    countCell(id, field) {
        return [...this.list.querySelectorAll('[data-count]')]
            .find(cell => cell.dataset.count === field && cell.closest('tr').dataset.id === id) || null;
    },

    /** Mazeret hücresi yazdırmada da kalsın: tarihler kısa biçimde yazılır. */
    renderExcuseCell(cell, person) {
        if (!person.excuses.length) {
            cell.append(ui.create('<span class="dash">mazereti yok</span>'));
            return;
        }

        const MAX_SHOWN = 3;
        const labels = person.excuses.map(excuse => dates.toDisplay(excuse.date).slice(0, 5));
        const shown = labels.slice(0, MAX_SHOWN).join(', ') + (labels.length > MAX_SHOWN ? ` +${labels.length - MAX_SHOWN}` : '');

        const button = ui.create('<button class="pill exc" type="button" data-act="excuse"></button>');
        button.textContent = `${person.excuses.length} gün · ${shown}`;
        button.title = `${person.name} — mazeret günlerini düzenle`;
        cell.append(button);
    },

    renderActions(cell, person) {
        const excuse = ui.create('<button class="btn sm sec" type="button" data-act="excuse">Mazeret</button>');
        const remove = ui.create('<button class="btn sm danger" type="button" data-act="remove">Sil</button>');

        excuse.setAttribute('aria-label', `${person.name} — mazeret günleri`);
        remove.setAttribute('aria-label', `${person.name} — kişiyi sil`);

        cell.append(excuse, remove);
    },

    // ---------- Kişi ekleme ----------
    openModal() {
        document.getElementById('personName').value = '';
        this.showError(null);
        ui.openModal('personModal');
    },

    showError(message) {
        const box = document.getElementById('personError');
        box.textContent = message || '';
        box.hidden = !message;
        document.getElementById('personName').classList.toggle('input--invalid', Boolean(message));
    },

    save() {
        const input = document.getElementById('personName');
        const name = input.value.replace(/\s+/g, ' ').trim();
        const error = state.validateName(name);

        if (error) {
            this.showError(error);
            input.focus();
            return;
        }

        state.addPerson(name);
        ui.closeModal('personModal');
        // Kişi sayısı tablo başlığında ve konu satırında zaten okunuyor; fiş yeter.
        ui.toast(`${name} listeye eklendi.`, 'ok');
    },

    // ---------- İsim düzeltme ----------
    rename(id, rawName) {
        const person = state.personById(id);
        if (!person) return;

        const name = String(rawName || '').replace(/\s+/g, ' ').trim();
        if (name === person.name) return;

        const error = state.validateName(name, id);
        if (error) {
            ui.toast(error, 'warn');
            // Kaydedilemeyen ad yalnız bu hücrede geri alınır: tüm tabloyu yeniden
            // kurmak komşu hücrede süren bir düzenlemeyi silerdi.
            // (ID ile seçici kurmak yerine veri okunur: ID'de tırnak/özel karakter olabilir.)
            const cell = [...this.list.querySelectorAll('[data-rename]')]
                .find(element => element.dataset.rename === id);
            if (cell) cell.textContent = person.name;
            return;
        }

        state.renamePerson(id, name);
        ui.toast('İsim güncellendi.', 'ok');
    },

    // ---------- Devir sayıları ----------
    /**
     * Devir hanesinin kaydı: boş hücre ya da çizgi sıfırdır, sayı olmayan yazı geri
     * alınır. Dağıtımı etkilemediği için bu değişim çizelgeyi bayatlatmaz.
     */
    saveCount(id, field, rawText) {
        const person = state.personById(id);
        if (!person) return;

        const text = String(rawText || '').replace(/\s+/g, '');
        const value = !text || text === '—' || text === '-' ? 0 : Number(text);
        const cell = this.countCell(id, field);

        if (!Number.isFinite(value)) {
            ui.toast(`${this.CARRIED[field].label} hanesine yalnızca tam sayı yazılabilir.`, 'warn');
            // Yalnız bu hücre geri alınır: tabloyu yeniden kurmak komşu hücrede
            // süren bir düzenlemeyi silerdi (ad hanesiyle aynı davranış).
            if (cell) cell.textContent = person[field] || '—';
            return;
        }

        if (!state.setCarried(id, field, value)) return;

        // Sınırlandırdıysak (örn. 1,5 -> 1, 99999 -> 9999) hücre fiilen kalan değeri göstersin.
        if (cell) cell.textContent = person[field] || '—';
        ui.toast(`${person.name}: ${this.CARRIED[field].label} ${person[field]}.`, 'ok');
    },

    // ---------- Silme ----------
    async remove(id) {
        const person = state.personById(id);
        if (!person) return;

        const answer = await ui.confirm({
            title: 'Kişiyi sil',
            message: `${person.name} silinsin mi? Mazeretleri de silinir ve çizelgenin yeniden oluşturulması gerekir.`,
            okText: 'Sil',
            danger: true
        });

        if (!answer) return;

        state.removePerson(id);
        // "Çizelge yeniden oluşturulmalı" uyarısı onay penceresinde zaten okundu;
        // altlık satırında yinelemek yerine fiş bırakılır.
        ui.toast(`${person.name} silindi.`, 'info');
    },

    async clearAll() {
        if (!state.personnel.length) {
            ui.toast('Silinecek personel yok.', 'info');
            return;
        }

        const answer = await ui.confirm({
            title: 'Tüm personeli sil',
            message: `${state.personnel.length} kişinin tamamı ve mazeretleri silinsin mi? Bu işlem geri alınamaz.`,
            okText: 'Tümünü sil',
            danger: true
        });

        if (!answer) return;

        state.clearPersonnel();
        ui.toast('Tüm personel silindi.', 'info');
    }
};
