/**
 * personnel.js - 2. bölüm: personel beyanı tablosu.
 *
 * Satırlar sabit şablondan üretilir, kullanıcı metni yalnızca property ile yazılır
 * (HTML'e asla interpolation yapılmaz); tüm tıklamalar tek devredilen dinleyiciyle okunur.
 */

const personnelPanel = {
    pendingRender: false,

    init() {
        this.table = document.getElementById('personnelTable');
        this.list = document.getElementById('personnelList');
        this.empty = document.getElementById('personnelEmpty');

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

        // Satır içi isim düzeltmesi: yalnızca düzenlenebilir hücre kaydeder, düğmeler değil.
        // Kayıt bir sonraya bırakılır: focusout sırasında yeni hücre henüz odaklanmamıştır;
        // tabloyu hemen yeniden kurmak o hücreyi yok edip odağı gövdeye düşürürdü.
        this.list.addEventListener('focusout', (event) => {
            const cell = event.target.closest('[data-rename]');
            if (!cell) return;

            const id = cell.dataset.rename;
            const draft = cell.textContent;

            setTimeout(() => {
                this.rename(id, draft);
                if (this.pendingRender) {
                    this.pendingRender = false;
                    this.render();
                }
            }, 0);
        });

        // Enter satır atlamasın: hücreden çıkmak kaydetmek demektir. Düğmeli kısayollar
        // (Ctrl+Enter) ayrıdır: hücrede yazarken liste üretildiğinde metin silinmez.
        this.list.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' || event.ctrlKey || event.metaKey || event.altKey) return;

            const cell = event.target.closest('[data-rename]');
            if (cell) {
                event.preventDefault();
                cell.blur();
            }
        });

        // Yapıştırılan metin zengin biçimli gelebilir (kalın, renkli): hücre düz metin almalı.
        this.list.addEventListener('paste', (event) => {
            if (!event.target.closest('[data-rename]')) return;

            event.preventDefault();
            const text = event.clipboardData.getData('text/plain').replace(/\s+/g, ' ');
            if (!document.execCommand('insertText', false, text)) event.target.textContent = text;
        });

        state.on('personnel', () => this.render());
        state.on('schedule', () => this.render());
        this.render();
    },

    /** Sayılar state.rank() üzerinden gelir; üretilmiş liste de hesaba katılmış olur. */
    render() {
        // Bir isim hücresi düzenlenirken tabloyu yıkmak yazılanı siler (ör. düzenleme
        // üstüne Ctrl+Enter). Hücreden çıkınca focusout zaten kaydedip çizerdir.
        if (this.list.contains(document.activeElement)) {
            this.pendingRender = true;
            return;
        }

        const loads = new Map(state.rank().map(item => [item.id, item]));

        document.getElementById('personnelCount').textContent = state.personnel.length;

        // Boş listede tablo başlıkları da görünsün istenmez.
        this.table.hidden = state.personnel.length === 0;
        this.empty.hidden = state.personnel.length > 0;

        const fragment = document.createDocumentFragment();
        state.personnel.forEach((person, index) => fragment.append(this.renderRow(person, loads.get(person.id), index)));
        this.list.replaceChildren(fragment);
    },

    renderRow(person, load, index) {
        const row = ui.create(`
            <tr>
                <td class="cell-idx t-num"></td>
                <td><span class="name-edit" contenteditable="true" spellcheck="false" data-rename></span></td>
                <td class="cell-num t-num cell-carried"></td>
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

        const total = load ? load.total : person.shifts;
        const weekend = load ? load.weekend : person.weekends;

        row.querySelector('.cell-carried').textContent = person.shifts || '—';
        row.querySelector('.cell-total').textContent = total;
        row.querySelector('.cell-weekend').textContent = weekend;

        this.renderExcuseCell(row.querySelector('.cell-excuse'), person);
        this.renderActions(row.querySelector('.cell-actions'), person);

        return row;
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
        ui.toast(`${person.name} silindi.`, 'info');
        ui.status('Personel değişti; dağılımı yeniden oluşturun.', 'warn');
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
        ui.status('Personel listesi boşaltıldı.', 'warn');
    }
};
