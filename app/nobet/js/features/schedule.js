/**
 * schedule.js - 3. bölüm: üretilen nöbet çizelgesi.
 *
 * state.schedule çizelgeye dönüştürülür, dağıtım buradan tetiklenir ve tek bir
 * nöbet hücresi elle değiştirilebilir. Gösterim metinleri üretim anında hazırlanır;
 * saklanan liste sade kalır, Excel/PDF/yazdırma aynı veriyi yeniden kullanır.
 */

const schedulePanel = {
    swap: { date: '', slot: 0, currentId: null },
    staleShown: null,
    busy: false,

    init() {
        document.getElementById('btnGenerate').addEventListener('click', () => this.generate());
        document.getElementById('btnShuffle').addEventListener('click', () => this.generate());
        document.getElementById('btnSwapApply').addEventListener('click', () => this.applySwap());

        document.getElementById('rosterBody').addEventListener('click', (event) => {
            const chip = event.target.closest('[data-slot]');
            if (chip) this.openSwap(chip.closest('tr').dataset.date, Number(chip.dataset.slot));
        });

        document.getElementById('swapSelect').addEventListener('change', (event) => this.checkCandidate(event.target.value));

        state.on('schedule', () => this.render());
        state.on('settings', () => this.render());
        state.on('personnel', () => this.render());
        this.render();
    },

    // ---------- Dağıtım ----------
    generate() {
        // Çözücü saniyelerce sürebilir: üst üste gelen tıklama ikinci bir hesap kuyruğu açar.
        if (this.busy) return;

        const error = state.validate();
        if (error) {
            ui.toast(error, 'error');
            ui.status(error, 'error');
            return;
        }

        // Çözücü ana iş parçasını meşgul eder; önce fişin çizilmesini bekle.
        this.setBusy(true);
        ui.status('Dağılım hesaplanıyor...', 'warn');
        ui.toast('Dağılım hesaplanıyor...', 'info');

        setTimeout(() => {
            const result = scheduler.generate(state.personnel, state.settings);
            this.setBusy(false);

            if (!result.ok) {
                this.showError(result);
                return;
            }

            state.setSchedule(result.days);
            ui.toast(`Nöbet çizelgesi oluşturuldu (${result.days.length} gün).`, 'ok');
            // Gün ve nöbetçi sayısı özet kutularında ve konu satırında zaten yazılı.
            ui.status('Çizelge hazır.', 'ok');
        }, 40);
    },

    /** Hesap sürerken iki üretim düğmesi de kilitlenir: çift tıklama çift hesap demekti. */
    setBusy(busy) {
        this.busy = busy;
        ['btnGenerate', 'btnShuffle'].forEach((id) => {
            const button = document.getElementById(id);
            if (button) button.disabled = busy;
        });
    },

    /** Bulunamayan dağıtımın sebebi satırlar halinde yazılır; öneri de detayın içinde. */
    showError(result) {
        console.error('Çözücü:', result.detail);
        state.clearSchedule();
        ui.toast(result.error, 'error');
        ui.status(result.error, 'error');

        document.getElementById('rosterErrorTitle').textContent = result.error;
        document.getElementById('rosterErrorDetail').textContent = result.detail;
        document.getElementById('rosterError').hidden = false;
    },

    // ---------- Görünüm ----------
    render() {
        const hasList = state.hasSchedule();
        const stale = hasList && !state.scheduleIsFresh();
        const table = document.getElementById('rosterTable');

        document.getElementById('rosterError').hidden = true;
        document.getElementById('rosterEmpty').hidden = hasList;
        document.getElementById('rosterStale').hidden = !stale;
        table.hidden = !hasList;

        if (stale !== this.staleShown) {
            this.staleShown = stale;
            ui.status(stale
                ? 'Çizelge bayat — kural veya personel değişti, yeniden oluşturun.'
                : 'Çizelge yine güncel.', stale ? 'warn' : 'ok');
        }

        const perDay = this.slotCount();
        const showExcused = state.showsExcused();

        document.getElementById('dutyHeader').textContent = perDay > 1 ? `Nöbetçiler (${perDay})` : 'Nöbetçi';
        document.getElementById('excusedHeader').hidden = !showExcused;
        document.getElementById('rosterExcuseNote').textContent = this.excuseCaption();
        // Kural özeti çizelge olmasa da güncel kuralı söylemeli: bayat metin kağıda geçmesin.
        this.renderDocFooter();

        if (!hasList) {
            document.getElementById('rosterBody').replaceChildren();
            document.getElementById('rosterCount').textContent = 0;
            // Durum satırı artık var olmayan bir listeyi iddia etmemeli.
            ui.status('Çizelge yok — bölüm 1 ve 2’yi tamamladıktan sonra “Listeyi oluştur”a basın.', 'info');
            return;
        }

        const fragment = document.createDocumentFragment();
        state.schedule.forEach(day => fragment.append(this.renderDay(day, perDay, showExcused)));
        document.getElementById('rosterBody').replaceChildren(fragment);

        document.getElementById('rosterCount').textContent = state.schedule.length;
    },

    /**
     * Satır başına kaç nöbetçi hücresi çizileceği.
     * Bayat listede gün başına kişi sayısı bu günün kuralından farklı olabilir; yalnız
     * güncel kural sayısı kullanılırsa o satırdaki isimler ekranda hiç görünmez.
     */
    slotCount() {
        const widest = state.schedule.reduce((max, day) => Math.max(max, day.assigned.length), 0);
        return Math.max(1, state.settings.perDay, widest);
    },

    /** Tablo başlığının altındaki tek cümle: mazeretlerin şu an gösterilip gösterilmediği. */
    excuseCaption() {
        return state.showsExcused()
            ? 'mazeretli günler satırın sonunda belirtilir'
            : 'mazeretler gizli, çizelgede belirtilmez';
    },

    renderDay(day, perDay, showExcused) {
        const row = ui.create(`
            <tr${day.weekend ? ' class="is-weekend"' : ''}>
                <td class="cell-date"></td>
                <td class="cell-day"></td>
                <td class="cell-duty"></td>
                <td class="cell-excused"></td>
            </tr>`);

        row.dataset.date = day.date;
        row.querySelector('.cell-date').textContent = dates.toDisplay(day.date);
        row.querySelector('.cell-day').textContent = dates.weekdayLong(day.date);

        const dutyCell = row.querySelector('.cell-duty');
        for (let slot = 0; slot < perDay; slot++) {
            // Virgül: birden çok nöbetçi yan yana okunurken isimler birbirine girmesin.
            if (slot > 0) dutyCell.append(document.createTextNode(', '));
            dutyCell.append(this.renderChip(day, slot));
        }

        // Mazeretler görevin yanında durur; gerekçe kişisel ise hiç yazılmaz.
        const excuseCell = row.querySelector('.cell-excused');
        excuseCell.hidden = !showExcused;
        if (!showExcused) return row;

        const excused = state.excusedFor(day);
        if (excused.length) {
            excused.forEach(person => {
                const pill = ui.create('<span class="exc"></span>');
                pill.textContent = person.note ? `${person.name} (${person.note})` : person.name;
                excuseCell.append(pill);
                excuseCell.append(document.createTextNode(' '));
            });
        } else {
            excuseCell.append(ui.create('<span class="dash">—</span>'));
        }

        return row;
    },

    renderChip(day, slot) {
        const assigned = day.assigned[slot];
        const chip = ui.create('<button class="chip" type="button" title="Nöbetçiyi değiştirmek için tıkla"></button>');
        chip.dataset.slot = slot;

        if (assigned) {
            // textContent: isimler kullanıcı verisidir, HTML olarak parse edilmez.
            chip.textContent = assigned.name;
            chip.setAttribute('aria-label', `${assigned.name} — nöbetçiyi değiştir`);
            return chip;
        }

        chip.classList.add('empty');
        chip.removeAttribute('title');
        // Boş hücre tıklanamaz: elle doldurulursa atama dizisinde delik açılır ve
        // kayıt geri yüklenirken isimler satır içinde kayar. Önce çizelge yeniden üretilmeli.
        chip.disabled = true;
        chip.textContent = 'atanmadı';
        return chip;
    },

    /** Belge altlığındaki kural özeti; antet birim/dönem bilgisini zaten taşır. */
    renderDocFooter() {
        const s = state.settings;
        document.getElementById('printFoot').textContent =
            `${state.personnel.length} personel · günde ${s.perDay} nöbetçi · ` +
            `dinlenme ${s.minRestDays} gün · peş peşe en fazla ${s.maxConsecutive} gün`;
    },

    // ---------- Elle nöbetçi değiştirme ----------
    openSwap(date, slot) {
        const day = state.schedule.find(item => item.date === date);
        const current = day && day.assigned[slot];
        if (!day) return;

        this.swap = { date, slot, currentId: current ? current.id : null };

        document.getElementById('swapInfo').textContent = current
            ? `${dates.formatLong(date)} (${dates.weekdayLong(date)}) — ${current.name} yerine kim nöbetçi olsun?`
            : `${dates.formatLong(date)} (${dates.weekdayLong(date)}) — bu güne kim nöbetçi olsun?`;

        const select = document.getElementById('swapSelect');
        select.replaceChildren(this.option('', '— Seçiniz —'));

        // O gün mazeretli olan kişi aday listesine hiç girmez.
        state.personnel
            .filter(p => p.id !== this.swap.currentId && !state.isExcused(p, date))
            .forEach(p => select.append(this.option(p.id, p.name)));

        this.setSwapState('idle');
        ui.openModal('swapModal');
    },

    option(value, label) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = label;
        return opt;
    },

    /**
     * Uyarı satırı ile onay düğmesi her zaman aynı durumu söyler.
     * tone: idle (seçim yok) | ok | warn (serbest ama not) | block (izin yok)
     */
    setSwapState(tone, message = '') {
        const warning = document.getElementById('swapWarning');
        const button = document.getElementById('btnSwapApply');

        warning.dataset.tone = tone === 'block' ? 'danger' : 'warn';
        warning.hidden = tone === 'idle' || tone === 'ok';
        warning.querySelector('span').textContent = message;

        button.disabled = !(tone === 'ok' || tone === 'warn');
    },

    /**
     * Aday, geçici olarak yerine konur ve kişinin tüm çizelgesi kurallara göre
     * doğrulanır: elle yapılan değişiklik de kuralları bozamaz.
     */
    checkCandidate(id) {
        const person = state.personById(id);
        if (!person) return this.setSwapState('idle');

        const day = state.schedule.find(item => item.date === this.swap.date);
        if (!day) return this.setSwapState('idle');

        if (day.assigned.some(assigned => assigned && assigned.id === id)) {
            return this.setSwapState('block', `${person.name} bu günde zaten nöbetçi.`);
        }

        const limit = state.settings.maxTotal;
        const total = (state.rank().find(item => item.id === id) || { total: 0 }).total;
        if (limit > 0 && total + 1 > limit) {
            return this.setSwapState('block', `${person.name}: ${total + 1} görev, üst sınır (${limit}) aşılıyor.`);
        }

        const violation = this.simulatedViolation(day, person);
        if (violation) return this.setSwapState('block', violation);

        // Komşu günde görev almak serbesttir (peş peşe sınırının içindeyse), ama görünmeli.
        const index = state.schedule.indexOf(day);
        const neighbours = [state.schedule[index - 1], state.schedule[index + 1]];
        const touching = neighbours.some(item => item && item.assigned.some(a => a && a.id === id));

        if (touching) {
            return this.setSwapState('warn', `${person.name} komşu günde de nöbetçi; peş peşe görev oluşuyor.`);
        }

        this.setSwapState('ok');
    },

    /** Atamayı bir an için yapıp ihlali ölçer, sonra eski hâline döndürür. */
    simulatedViolation(day, person) {
        const slot = this.swap.slot;
        const previous = day.assigned[slot];

        day.assigned[slot] = { id: person.id, name: person.name };
        const violation = this.ruleViolation(person.id);
        day.assigned[slot] = previous;

        return violation ? `${person.name} için kural ihlali: ${violation}.` : null;
    },

    /** Kişinin çizelgedeki görev dizisi: peş peşe sınırı ve dinlenme günleri. */
    ruleViolation(id) {
        const s = state.settings;
        const days = state.schedule;
        let streak = 0;
        let last = -1;

        for (let i = 0; i < days.length; i++) {
            if (!days[i].assigned.some(person => person && person.id === id)) continue;

            streak = last === i - 1 ? streak + 1 : 1;

            if (last !== -1) {
                const gap = i - last;
                if (gap === 1 && streak > s.maxConsecutive) return `peş peşe ${streak} gün (sınır ${s.maxConsecutive})`;
                if (gap > 1 && gap - 1 < s.minRestDays) return `${gap - 1} gün dinlenme kaldı (gerekli ${s.minRestDays})`;
            }

            last = i;
        }

        return null;
    },

    applySwap() {
        const person = state.personById(document.getElementById('swapSelect').value);
        const day = state.schedule.find(item => item.date === this.swap.date);
        if (!person || !day) return;

        day.assigned[this.swap.slot] = { id: person.id, name: person.name };
        state.persistSchedule();

        ui.closeModal('swapModal');
        ui.toast(`${dates.formatShort(day.date)} günü ${person.name} olarak güncellendi.`, 'ok');
        ui.status('Manuel değişiklik uygulandı.', 'ok');
    }
};
