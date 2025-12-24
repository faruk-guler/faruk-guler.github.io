/**
 * Storage Module - LocalStorage Management
 * Based on working index.old.html implementation
 */

const STORAGE_KEY = 'nobet_personeller';
const SETTINGS_KEY = 'nobet_ayarlar';
const THEME_KEY = 'theme';

const storage = {
    /**
     * Generate Super Short Unique ID (6-8 characters)
     */
    generateID() {
        return Math.random().toString(36).substr(2, 8);
    },

    /**
     * Migrate old data to new ID-based structure
     */
    migrateData(data) {
        if (!Array.isArray(data)) return [];

        let migrated = false;
        const newData = data.map(p => {
            // Replace old long UUIDs with short IDs
            if (!p.id || p.id.length > 15) {
                p.id = this.generateID();
                migrated = true;
            }
            // Ensure mazeretler array exists
            if (!p.mazeretler) {
                p.mazeretler = [];
                migrated = true;
            }
            // Ensure counters exist
            if (typeof p.nobetSayisi !== 'number') { p.nobetSayisi = 0; migrated = true; }
            if (typeof p.haftaSonuNobetSayisi !== 'number') { p.haftaSonuNobetSayisi = 0; migrated = true; }

            return p;
        });

        if (migrated) {
            console.log('🔄 Veri yapısı güncellendi - Tüm ID\'ler kısa formata çevrildi');
            this.savePersonnel(newData);
        }
        return newData;
    },

    /**
     * Save personnel data to LocalStorage
     */
    savePersonnel(personeller) {
        try {
            // Ensure integrity before save
            const safeData = personeller.map(p => ({
                id: p.id || this.generateID(),
                ad: p.ad,
                nobetSayisi: p.nobetSayisi || 0,
                haftaSonuNobetSayisi: p.haftaSonuNobetSayisi || 0,
                mazeretler: p.mazeretler || [],
                sonNobet: p.sonNobet,
                ustusteNobet: p.ustusteNobet || 0
            }));

            localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
            return true;
        } catch (e) {
            console.error('LocalStorage kayıt hatası:', e);
            return false;
        }
    },

    /**
     * Load personnel data from LocalStorage
     */
    loadPersonnel() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return [];

            const data = JSON.parse(saved);
            return this.migrateData(data);
        } catch (e) {
            console.error('LocalStorage yükleme hatası:', e);
            return [];
        }
    },

    /**
     * Save settings to LocalStorage
     */
    saveSettings(ayarlar) {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(ayarlar));
            return true;
        } catch (e) {
            console.error('Ayarlar kayıt hatası:', e);
            return false;
        }
    },

    /**
     * Load settings from LocalStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem(SETTINGS_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Ayarlar yükleme hatası:', e);
            return null;
        }
    },

    /**
     * Save theme preference
     */
    saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
            return true;
        } catch (e) {
            console.error('Tema kayıt hatası:', e);
            return false;
        }
    },

    /**
     * Load theme preference
     */
    loadTheme() {
        try {
            return localStorage.getItem(THEME_KEY) || 'light';
        } catch (e) {
            console.error('Tema yükleme hatası:', e);
            return 'light';
        }
    }
};
