/**
 * storage.js - LocalStorage kalıcılığı.
 *
 * Görevi: JSON'u güvenle okuyup yazmak, v3 kayıtlarını bir kez taşımak ve uygulamaya
 * gelen verinin bugünkü şemaya uymasını garanti etmek.
 * Başka hiçbir modül localStorage'a doğrudan dokunmaz.
 */

const storage = {
    KEYS: {
        personnel: 'nobet4_personnel',
        settings: 'nobet4_settings',
        schedule: 'nobet4_schedule',
        theme: 'nobet4_theme'
    },

    // v3 anahtarları; yalnızca mevcut kullanıcı verisini taşımak için.
    LEGACY: {
        personnel: 'nobet_personeller',
        settings: 'nobet_ayarlar',
        schedule: 'nobet_liste'
    },

    DEFAULT_SETTINGS: {
        unit: '',
        start: '',
        end: '',
        perDay: 1,
        maxConsecutive: 2,
        minRestDays: 3,
        maxTotal: 0,
        splitWeekends: true,
        // Mazeretli sütunu çizelgede ve dökümlerde görünsün mü (ad + gerekçe)?
        // Gerekçeler sağlık bilgisi gibi kişisel olabildiği için varsayılan KAPALI:
        // yeni kurulum sütunu görmez, isteyen 2. sayfadaki anahtarla açar.
        showExcuses: false
    },

    newId() {
        return `${Date.now().toString(36).slice(-4)}${Math.random().toString(36).slice(2, 6)}`;
    },

    /**
     * Kişi kimliği mazeretlerin, çizelgedeki atamaların ve elle değiştirmenin tek
     * bağlantısıdır: iki kişi aynı ID'yi alırsa kayıtlar sessizce birbirine karışır.
     */
    uniqueId(taken) {
        const used = taken instanceof Set ? taken : new Set(taken || []);
        let id = this.newId();

        while (used.has(id)) id = this.newId();
        return id;
    },

    readJson(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error('Okunamayan kayıt:', key, error);
            return null;
        }
    },

    writeJson(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Kayıt edilemedi:', key, error);
            ui.toast('Kayıt yapılamadı (tarayıcı deposu dolu olabilir).', 'error');
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Silinemedi:', key, error);
        }
    },

    // ---------- Personnel ----------
    /** Kullanici verisinin sinirlari: uzun bir ad/kayit tabloyu ve PDF basligini tasirir.
     *  unit=100: PDF basligi en kucuk 7 puntoya sigabilecek en uzun kurum adidir. */
    LIMITS: { name: 60, note: 40, unit: 100 },

    /** Accepts anything (v3 record, Excel row, partial object) and returns a valid person or null. */
    normalizePerson(raw) {
        if (!raw || typeof raw !== 'object') return null;

        const name = ui.unescapeHtml(raw.name ?? raw.ad ?? '')
            .replace(/\s+/g, ' ').trim().slice(0, this.LIMITS.name);
        if (!name) return null;

        const excuses = Array.isArray(raw.excuses ?? raw.mazeretler)
            ? (raw.excuses ?? raw.mazeretler)
            : [];

        const seen = new Set();
        const cleanExcuses = [];

        excuses.forEach((item) => {
            if (!item) return;
            const date = dates.normalize(item.date ?? item.tarih);
            if (!date || seen.has(date)) return;
            seen.add(date);
            cleanExcuses.push({
                date,
                note: ui.unescapeHtml(item.note ?? item.aciklama ?? '').trim().slice(0, this.LIMITS.note)
            });
        });

        cleanExcuses.sort((a, b) => a.date.localeCompare(b.date));

        return {
            id: typeof raw.id === 'string' && raw.id.trim().length > 0 && raw.id.length <= 15 ? raw.id.trim() : this.newId(),
            name,
            shifts: this.count(raw.shifts ?? raw.nobetSayisi),
            weekends: this.count(raw.weekends ?? raw.haftaSonuNobetSayisi),
            excuses: cleanExcuses
        };
    },

    /** Devir sayilari: negatif/NaN/asiri buyuk degerler makul araliga cekilir. */
    count(value) {
        const n = Number(value);
        return Number.isFinite(n) ? Math.min(9999, Math.max(0, Math.trunc(n))) : 0;
    },

    loadPersonnel() {
        const current = this.readJson(this.KEYS.personnel);
        if (Array.isArray(current)) return this.withUniqueIds(current.map(p => this.normalizePerson(p)).filter(Boolean));

        // First v4 start: bring the v3 list over when it exists.
        const legacy = this.readJson(this.LEGACY.personnel);
        if (!Array.isArray(legacy)) return [];

        const migrated = this.withUniqueIds(legacy.map(p => this.normalizePerson(p)).filter(Boolean));
        if (migrated.length) this.savePersonnel(migrated);
        return migrated;
    },

    /**
     * Cift ID'ler sessizce iki kisinin kayitlarini ust uste bindirir (mazeret,
     * atama, elle degistirme hepsi ID ile baglanir). Eski/el ile duzenlenmis
     * kayitlarda bulunabilecegi icin yuklerken bir kez temizlenir.
     */
    withUniqueIds(list) {
        const used = new Set();

        return list.map((person) => {
            const id = used.has(person.id) ? this.uniqueId(used) : person.id;
            used.add(id);
            return { ...person, id };
        });
    },

    savePersonnel(list) {
        const clean = this.withUniqueIds((list || []).map(p => this.normalizePerson(p)).filter(Boolean));
        return this.writeJson(this.KEYS.personnel, clean);
    },

    // ---------- Settings ----------
    normalizeSettings(raw) {
        const source = raw && typeof raw === 'object' ? raw : {};
        const base = this.DEFAULT_SETTINGS;
        const positive = (value, fallback, max) => {
            const n = parseInt(value, 10);
            if (Number.isNaN(n)) return fallback;
            return Math.min(max, Math.max(1, n));
        };

        return {
            unit: String(source.unit ?? source.listeBasligi ?? base.unit).trim().slice(0, this.LIMITS.unit),
            start: dates.normalize(source.start ?? source.baslangicTarihi),
            end: dates.normalize(source.end ?? source.bitisTarihi),
            perDay: positive(source.perDay ?? source.nobetciSayisi, base.perDay, 10),
            maxConsecutive: positive(source.maxConsecutive ?? source.ustUsteNobetSayisi, base.maxConsecutive, 30),
            minRestDays: (() => {
                const n = parseInt(source.minRestDays ?? source.nobetArasiGun, 10);
                return Number.isNaN(n) ? base.minRestDays : Math.min(30, Math.max(0, n));
            })(),
            maxTotal: (() => {
                const n = parseInt(source.maxTotal ?? source.maxShifts, 10);
                return Number.isNaN(n) ? base.maxTotal : Math.min(365, Math.max(0, n));
            })(),
            splitWeekends: (source.splitWeekends ?? source.haftaSonuAyri) !== false,
            showExcuses: (() => {
                if (typeof source.showExcuses === 'boolean') return source.showExcuses;
                // Ara adımda kalan 'excuseMode' kaydı: gizlilik yönünde okunur,
                // yani yalnızca tam görünürlük ('note') anahtarı açık sayar.
                if (typeof source.excuseMode === 'string') return source.excuseMode === 'note';
                return base.showExcuses;
            })()
        };
    },

    loadSettings() {
        const current = this.readJson(this.KEYS.settings);
        if (current) return this.normalizeSettings(current);

        const legacy = this.readJson(this.LEGACY.settings);
        return this.normalizeSettings(legacy || {});
    },

    saveSettings(settings) {
        return this.writeJson(this.KEYS.settings, this.normalizeSettings(settings));
    },

    // ---------- Generated schedule ----------
    /**
     * The schedule is stored together with the signature of the rules and personnel it was
     * built for; the caller decides whether it is still valid.
     */
    saveSchedule(signature, days) {
        return this.writeJson(this.KEYS.schedule, { signature, days });
    },

    loadSchedule() {
        const data = this.readJson(this.KEYS.schedule) || this.readJson(this.LEGACY.schedule);
        if (!data || typeof data.signature !== 'string' || !Array.isArray(data.days)) return null;

        const days = data.days
            .filter(day => day && dates.isIso(day.date) && Array.isArray(day.assigned))
            .map(day => ({
                date: day.date,
                weekend: day.weekend ?? dates.isWeekend(day.date),
                assigned: day.assigned.filter(a => a && a.id).map(a => ({ id: a.id, name: String(a.name ?? a.ad ?? '') })),
                excused: (day.excused ?? day.mazerets ?? []).map(e => ({
                    id: e.id ?? null,
                    name: String(e.name ?? e.ad ?? ''),
                    note: String(e.note ?? e.aciklama ?? '')
                }))
            }));

        return { signature: data.signature, days };
    },

    clearSchedule() {
        this.remove(this.KEYS.schedule);
        this.remove(this.LEGACY.schedule);
    },

    // ---------- Tema ----------
    /** null = kullanıcı hiç seçmedi; o zaman sistem tercihi geçerli (index.html'deki ön boyama da aynısını yapar). */
    loadTheme() {
        try {
            return localStorage.getItem(this.KEYS.theme);
        } catch (error) {
            return null;
        }
    },

    saveTheme(theme) {
        try {
            localStorage.setItem(this.KEYS.theme, theme);
        } catch (error) {
            console.error('Tema kaydedilemedi:', error);
        }
    }
};
