/**
 * dates.js - uygulamanın tek tarih yardımcısı.
 * Tarihler her yerde yerel "YYYY-MM-DD" dizesidir; yerel tarihe toISOString
 * uygulanmadığı için saat diliminden kaynaklanan bir gün kayması yaşanamaz.
 */

const dates = {
    pad2(value) {
        return String(value).padStart(2, '0');
    },

    /** "YYYY-MM-DD" -> gece yarısı yerel Date */
    toDate(isoStr) {
        const [y, m, d] = String(isoStr).slice(0, 10).split('-').map(Number);
        return new Date(y, (m || 1) - 1, d || 1);
    },

    /** Date -> "YYYY-MM-DD" (yerel parçalarla) */
    toIso(date) {
        return `${date.getFullYear()}-${this.pad2(date.getMonth() + 1)}-${this.pad2(date.getDate())}`;
    },

    today() {
        return this.toIso(new Date());
    },

    /** Date / "YYYY-MM-DD" / "DD.MM.YYYY" / "DD/MM/YYYY" / "DD-MM-YYYY" -> "YYYY-MM-DD" (okunamayan: boş) */
    normalize(value) {
        if (value instanceof Date) {
            if (Number.isNaN(value.getTime())) return '';
            // Excel seri sayıları bazı saat dilimlerinde bir dakikanın biraz altında
            // üretilebiliyor (UTC+14'te 23:59:59 gibi). En yakın dakikaya yuvarlanmazsa
            // takvim günü bir geriye kayar; yerel parçalar okunmaya devam eder.
            const rounded = new Date(Math.round(value.getTime() / 60000) * 60000);
            return this.toIso(rounded);
        }

        const text = String(value ?? '').trim();
        if (!text) return '';

        // YYYY-MM-DD / YYYY.MM.DD / YYYY/MM/DD (tek veya çift haneli ay/gün)
        const iso = text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
        if (iso) {
            const m = parseInt(iso[2], 10);
            const d = parseInt(iso[3], 10);
            if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
                return `${iso[1]}-${this.pad2(m)}-${this.pad2(d)}`;
            }
        }

        // DD.MM.YYYY / DD/MM/YYYY / DD-MM-YYYY
        const parts = text.replace(/[-/]/g, '.').split('.');
        if (parts.length === 3 && /^\d{1,2}$/.test(parts[0]) && /^\d{1,2}$/.test(parts[1]) && /^\d{4}$/.test(parts[2])) {
            const d = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10);
            if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
                return `${parts[2]}-${this.pad2(m)}-${this.pad2(d)}`;
            }
        }
        return '';
    },

    isIso(value) {
        return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
    },

    /** "YYYY-MM-DD" -> "05.10.2026" */
    toDisplay(isoStr) {
        return String(isoStr || '').split('-').reverse().join('.');
    },

    /** "YYYY-MM-DD" -> "5 Ekim 2026" */
    formatLong(isoStr, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
        return this.toDate(isoStr).toLocaleDateString('tr-TR', options);
    },

    /** "YYYY-MM-DD" -> "5 Ekim" */
    formatShort(isoStr) {
        return this.formatLong(isoStr, { day: 'numeric', month: 'long' });
    },

    weekdayLong(isoStr) {
        return this.formatLong(isoStr, { weekday: 'long' });
    },

    /** Hafta Pazartesi ile başlar: 0 = Pzt ... 6 = Paz */
    weekdayIndex(isoStr) {
        return (this.toDate(isoStr).getDay() + 6) % 7;
    },

    isWeekend(isoStr) {
        const day = this.toDate(isoStr).getDay();
        return day === 0 || day === 6;
    },

    /** Başlangıç ve bitiş dâhil her gün, "YYYY-MM-DD" dizeleri olarak */
    list(startIso, endIso) {
        if (!this.isIso(startIso) || !this.isIso(endIso) || startIso > endIso) return [];

        const result = [];
        for (let d = this.toDate(startIso); this.toIso(d) <= endIso; d.setDate(d.getDate() + 1)) {
            result.push(this.toIso(d));
        }
        return result;
    },

    /**
     * "YYYY-MM" üzerine ay ekler/çıkar (mazeret takviminin gezinmesi için).
     * Ay sonu taşması engellenir: 31 Ekim + 1 ay "30 Kasım" olmalı, "1 Aralık" değil.
     */
    addMonths(isoStr, months = 1) {
        const source = this.toDate(isoStr);
        const target = new Date(source.getFullYear(), source.getMonth() + months, 1);
        const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();

        target.setDate(Math.min(source.getDate(), lastDay));
        return this.toIso(target);
    },

    /** "14:32" - durum satırı için */
    clockLabel() {
        return new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }
};
