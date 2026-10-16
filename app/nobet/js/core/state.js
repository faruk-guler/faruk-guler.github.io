/**
 * state.js - the single source of truth.
 *
 * All mutations go through this module; it persists the change and notifies subscribers,
 * so every panel stays in sync without knowing about the others.
 */

const state = {
    /** Bir çizelgenin en uzun dönemi (gün): çözücü derinliği ve tablo satır sayısı için üst sınır. */
    MAX_PERIOD_DAYS: 366,

    personnel: [],
    settings: {},
    schedule: [],
    scheduleSignature: null,
    docNo: null,

    listeners: new Map(),

    // ---------- Tiny event bus ----------
    on(event, handler) {
        if (!this.listeners.has(event)) this.listeners.set(event, []);
        this.listeners.get(event).push(handler);
    },

    emit(event) {
        (this.listeners.get(event) || []).forEach(handler => handler());
    },

    // ---------- Boot ----------
    init() {
        this.personnel = storage.loadPersonnel();
        this.settings = storage.loadSettings();

        if (!this.settings.start) this.settings.start = dates.today();
        if (!this.settings.end) this.settings.end = dates.addMonths(this.settings.start, 1);

        this.restoreSchedule();
    },

    /** Son üretilen listeyi geri yükle; kurallar değişmiş olsa bile (bayat olarak) korunur. */
    restoreSchedule() {
        const saved = storage.loadSchedule();
        if (!saved) return;

        // Listede artık var olmayan bir kişi varsa çıktı güvenilmezdir.
        const idsExist = saved.days.every(day => day.assigned.every(a => this.personById(a.id)));
        if (!idsExist) {
            storage.clearSchedule();
            return;
        }

        // İmza uyuşmuyorsa silme: kullanıcı kuralı geri alırsa liste kendiliğinden yine tazeleşir.
        this.schedule = saved.days;
        this.scheduleSignature = saved.signature;

        // Eski kayıt numara taşımıyorsa bir kez verilir ve yazılır: sonra o liste
        // kaç kez açılıp basılırsa basılsın AYNI numarayı taşır.
        if (saved.docNo) {
            this.docNo = saved.docNo;
        } else {
            this.docNo = this.buildDocNo();
            storage.saveSchedule(this.scheduleSignature, this.schedule, this.docNo);
        }
    },

    // ---------- Lookups ----------
    personById(id) {
        return this.personnel.find(p => p.id === id) || null;
    },

    isExcused(person, dateIso) {
        return person.excuses.some(excuse => excuse.date === dateIso);
    },

    // ---------- Mazeretlerin çıktadaki görünürlüğü ----------
    /**
     * Bazı mazeretler kişiseldir (hastalık vb.), bu yüzden çizelgede ve dökümde
     * hiç yer almeyabilir. Dağıtım kararı değişmediği için bu ayar signature()
     * İÇİNE ALINMAZ: anahtarı çevirmek listeyi bayatlatmaz.
     */
    showsExcused() {
        return this.settings.showExcuses !== false;
    },

    /** Üretilmiş bir günün mazeretli listesi; kapalıyken boş döner. */
    excusedFor(day) {
        if (!this.showsExcused()) return [];

        return (day.excused || []).map(person => ({ name: person.name, note: person.note || '' }));
    },

    /** Tablo dışındaki çıktılar (Excel, PDF) tek metin ister: aynı biçim burada üretilir. */
    excusedLabel(day) {
        return this.excusedFor(day)
            .map(person => (person.note ? `${person.name} (${person.note})` : person.name))
            .join(', ');
    },

    // ---------- Derived numbers ----------
    stats() {
        const s = this.settings;
        const days = dates.list(s.start, s.end);
        const perDay = s.perDay;
        const weekendDays = days.filter(date => dates.isWeekend(date)).length;
        const total = days.length * perDay;
        const staffCount = this.personnel.length;

        return {
            dayCount: days.length,
            total,
            weekendTotal: weekendDays * perDay,
            staffCount,
            perPerson: staffCount ? total / staffCount : 0,
            overLimit: s.maxTotal > 0 && staffCount > 0 && total / staffCount > s.maxTotal,
            notEnoughStaff: staffCount > 0 && staffCount < perDay
        };
    },

    /**
     * Duty load per person: imported history plus the current generated list.
     * Shared by the personnel table, the ranking view and the exports.
     */
    rank() {
        const load = this.personnel.map(p => ({
            id: p.id, name: p.name, total: p.shifts, weekend: p.weekends
        }));

        const index = new Map(load.map(item => [item.id, item]));

        this.schedule.forEach(day => day.assigned.forEach(person => {
            const item = index.get(person.id);
            if (!item) return;
            item.total++;
            if (day.weekend) item.weekend++;
        }));

        return load.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, 'tr'));
    },

    /** Signature of everything that can change the outcome (names excluded on purpose). */
    signature() {
        const s = this.settings;
        const rules = [s.start, s.end, s.perDay, s.maxConsecutive, s.minRestDays, s.maxTotal, s.splitWeekends].join('|');
        const people = this.personnel
            .map(p => `${p.id}:${p.excuses.map(e => e.date).sort().join(',')}`)
            .join(';');

        return `${rules}#${people}`;
    },

    hasSchedule() {
        return this.schedule.length > 0;
    },

    /**
     * Belge numarası: her çizelge üretiminde yenilenir ve listeyle birlikte saklanır,
     * böylece basılan her sürümün kendi numarası olur. Elle değiştirmede (swap)
     * değişmez. Ana ekranda değil; yazdırma/PDF/Excel künyesinde kullanılır.
     */
    documentNo() {
        return this.docNo || '—';
    },

    /**
     * Biçim: NOP-<yıl>-<ay>-<kuyruk> (ör. NOP-2026-10-9BWJV6, 18 karakter).
     * Yıl ve ay dönem başlangıcından gelir; sayılı gün/kişi bloğu BİLİNÇLİ olarak
     * yazılmaz: "2026-10-31G..." gibi bir parça "31 Ekim" sanılabiliyordu, üstelik
     * hem gün hem kişi sayısı konu satırında, özet kutularında ve çizelgede duruyor.
     * Benzersizlik sondaki 6 karakterlik kuyrukta: 32^6 ≈ 1,07 milyar olasılık.
     */
    buildDocNo() {
        const s = this.settings;
        if (!dates.isIso(s.start)) return null;

        const [year, month] = s.start.split('-');
        return `NOP-${year}-${month}-${this.docSerial(6)}`;
    },

    /**
     * Elle okunacak kuyruk: 0/O ve 1/I karışmasın diye alfabede yoktur. 32 karakterlik
     * alfabeye 256 bire bir bölündüğü için modulo kayması olmaz; kriptografi
     * yoksa (çok eski tarayıcı) Math.random'a düşer.
     */
    docSerial(length) {
        const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        const random = window.crypto && window.crypto.getRandomValues;
        const source = random
            ? window.crypto.getRandomValues(new Uint8Array(length))
            : Array.from({ length }, () => Math.floor(Math.random() * 256));

        let out = '';
        for (let i = 0; i < length; i++) out += alphabet[source[i] % alphabet.length];
        return out;
    },

    scheduleIsFresh() {
        return this.hasSchedule() && this.scheduleSignature === this.signature();
    },

    // ---------- Validation ----------
    /** Returns a Turkish error message, or null when generation can start. */
    validate() {
        const s = this.settings;

        if (!this.personnel.length) return 'Önce personel ekleyin.';
        if (!s.start || !s.end) return 'Başlangıç ve bitiş tarihini seçin.';
        if (s.start > s.end) return 'Başlangıç tarihi bitiş tarihinden sonra olamaz.';

        // Uzun dönem çözücüyü ve çizelge tablosunu bitirir: üst sınır bilinçli.
        const dayCount = dates.list(s.start, s.end).length;
        if (dayCount > this.MAX_PERIOD_DAYS) {
            return `Dönem en fazla ${this.MAX_PERIOD_DAYS} gün olabilir (şimdi ${dayCount} gün). ` +
                'Birden fazla ayı ayrı ayrı çizelgeleyin.';
        }

        if (s.perDay > this.personnel.length) {
            return `Vardiya başına ${s.perDay} kişi isteniyor ama listede ${this.personnel.length} personel var.`;
        }

        // Çözücüyü 10 saniye meşgul edecek imkânsızlık yerine hemen söyle.
        const shortfall = scheduler.capacityMessage(this.personnel.length, dayCount, s.perDay, s.maxTotal);
        if (shortfall) return shortfall;

        return null;
    },

    /** Shared by "add", "rename" and "import": one rule set for names. */
    validateName(name, exceptId = null) {
        const clean = String(name || '').replace(/\s+/g, ' ').trim();
        const MAX = storage.LIMITS.name;

        if (!clean) return 'İsim boş olamaz.';
        if (clean.length > MAX) return `İsim en fazla ${MAX} karakter olabilir.`;

        const lowered = clean.toLocaleLowerCase('tr-TR');
        if (this.personnel.some(p => p.id !== exceptId && p.name.toLocaleLowerCase('tr-TR') === lowered)) {
            return `"${clean}" listede zaten var.`;
        }

        return null;
    },

    /** Listedeki kimlikleri tekrarlamayan yeni bir kimlik üretir. */
    freshId() {
        return storage.uniqueId(this.personnel.map(person => person.id));
    },

    // ---------- Mutations (each one persists + notifies) ----------
    setSettings(patch) {
        this.settings = storage.normalizeSettings({ ...this.settings, ...patch });
        storage.saveSettings(this.settings);
        this.emit('settings');
    },

    /**
     * Kural değişti: liste SİLİNMEZ, bayat sayılır. Paneller 'schedule' olayıyla
     * durumu yeniden çizer; kullanıcı kuralı geri alırsa liste yine taze olur.
     * Yalnızca kişi silmede clearSchedule çağrılır: o listede artık var olmayan
     * birinin adı yazar, geri alınması da mümkün değildir.
     */
    touchScheduleValidity() {
        if (this.hasSchedule()) this.emit('schedule');
    },

    addPerson(rawName, shifts = 0, weekends = 0) {
        const name = String(rawName || '').replace(/\s+/g, ' ').trim();
        const person = storage.normalizePerson({
            id: this.freshId(), name, shifts, weekends, excuses: []
        });

        if (!person) return null;

        // Newest first: matches how people expect a freshly added row to appear.
        this.personnel.unshift(person);
        this.savePersonnel();
        return person;
    },

    renamePerson(id, rawName) {
        const person = this.personById(id);
        if (!person) return false;

        const name = String(rawName || '').replace(/\s+/g, ' ').trim();
        if (!name || name === person.name) return false;

        person.name = name;

        // Çizelgenin kendi kaydı da yeni yazıma geçer: adlar imzada YER ALMAZ, bu yüzden
        // liste bayatlamaz; ancak çizelge kaydedilmezse geri yüklemede eski yazım çıkar.
        this.schedule.forEach(day => {
            day.assigned.forEach(assigned => { if (assigned.id === id) assigned.name = name; });
            (day.excused || []).forEach(excused => { if (excused.id === id) excused.name = name; });
        });

        this.savePersonnel();
        this.persistSchedule();
        return true;
    },

    /**
     * Devir sayilari (onceki donemden gelen noubet ve hafta sonu sayilari) tablodan
     * duzenlenebilir: yalnizca yuk analizini ve dokum ozetini etkilerler, dagitimi
     * etkilemedikleri icin signature() icinde degillerdir - liste bayatlamaz.
     */
    setCarried(id, field, value) {
        const person = this.personById(id);
        if (!person || field !== 'shifts' && field !== 'weekends') return false;

        const clean = storage.count(value);
        if (person[field] === clean) return false;

        person[field] = clean;
        this.savePersonnel();
        return true;
    },

    removePerson(id) {
        const before = this.personnel.length;
        this.personnel = this.personnel.filter(p => p.id !== id);

        if (this.personnel.length === before) return false;

        // A roster mentioning a deleted person can no longer be trusted.
        this.clearSchedule();
        this.savePersonnel();
        return true;
    },

    clearPersonnel() {
        this.personnel = [];
        this.clearSchedule();
        this.savePersonnel();
    },

    importPersons(rows) {
        let added = 0;

        rows.forEach(row => {
            const name = String(row.name || '').replace(/\s+/g, ' ').trim();
            if (this.validateName(name)) return;

            const person = storage.normalizePerson({
                id: this.freshId(),
                name,
                shifts: parseInt(row.shifts, 10) || 0,
                weekends: parseInt(row.weekends, 10) || 0,
                excuses: []
            });

            if (person) {
                this.personnel.push(person);
                added++;
            }
        });

        if (added) {
            this.savePersonnel();
            // Yeni kişiler dağılımı değiştirir: liste bayatlar, silinmez.
            this.touchScheduleValidity();
        }

        return added;
    },

    setExcuses(id, excuses) {
        const person = this.personById(id);
        if (!person) return;

        person.excuses = excuses
            .map(e => ({
                date: dates.normalize(e.date),
                note: String(e.note || '').trim().slice(0, storage.LIMITS.note)
            }))
            .filter(e => e.date)
            .sort((a, b) => a.date.localeCompare(b.date));

        // Mazeret de dağıtımı değiştirir: liste SİLİNMEZ, bayat sayılır (kural değişikliğiyle
        // aynı davranış). Kullanıcı mazereti geri alırsa çizelge kendiliğinden yine taze olur.
        this.savePersonnel();
        this.touchScheduleValidity();
    },

    savePersonnel() {
        storage.savePersonnel(this.personnel);
        this.emit('personnel');
    },

    setSchedule(days) {
        this.schedule = days;
        this.scheduleSignature = this.signature();
        // Yeni dağıtım = yeni belge: numara her üretimde baştan verilir (Karıştır dahil).
        this.docNo = this.buildDocNo();
        storage.saveSchedule(this.scheduleSignature, days, this.docNo);
        this.emit('schedule');
    },

    clearSchedule() {
        if (!this.schedule.length && !this.scheduleSignature) return;
        this.schedule = [];
        this.scheduleSignature = null;
        this.docNo = null;
        storage.clearSchedule();
        this.emit('schedule');
    },

    /** Called after a manual swap: same rules, different content. */
    persistSchedule() {
        // Belge aynı belge: elle değiştirme numarayı yenilemez, mevcut numara olduğu gibi kalır.
        if (this.scheduleSignature) storage.saveSchedule(this.scheduleSignature, this.schedule, this.docNo);
        this.emit('schedule');
    }
};
