/**
 * ui.js - bildirim, pencere, onay ve durum satırı.
 * Alan bilgisi içermez; paneller sadece bu fonksiyonları çağırır.
 */

const ui = {
    // ---------- Metin güvenliği ----------
    /** Eski kayıtlar HTML'e kaçırılmış isimler taşıyabilir; düz metne döndürür. */
    unescapeHtml(value) {
        if (value === null || value === undefined) return '';
        return String(value)
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#0?39;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/&amp;/g, '&');
    },

    /**
     * Sabit bir şablondan tek eleman üretir.
     * SÖZLEŞME: şablon kullanıcı metni İÇERMEZ; metin property ile verilir.
     */
    create(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    },

    /** Ondalık: tam sayıya eşitse "10", değilse "10.5" — belgede ".0" gösterilmez. */
    measure(value, digits = 1) {
        const number = Number(value);
        if (!Number.isFinite(number)) return '—';
        return number.toFixed(digits).replace(/\.0+$/, '');
    },

    // ---------- Gün / gece teması ----------
    theme: 'day',

    /** index.html'deki ön boyamayla aynı sıra: kayıt varsa o, yoksa sistem tercihi. */
    initTheme() {
        const saved = storage.loadTheme();
        const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

        this.applyTheme(saved || (media && media.matches ? 'night' : 'day'));

        // Kullanıcı henüz kendi seçimine karar vermediyse sistemle birlikte hareket et.
        if (!saved && media) {
            media.addEventListener('change', (event) => {
                if (!storage.loadTheme()) this.applyTheme(event.matches ? 'night' : 'day');
            });
        }
    },

    applyTheme(theme) {
        this.theme = theme === 'night' ? 'night' : 'day';
        document.documentElement.dataset.theme = this.theme;

        const button = document.getElementById('themeToggle');
        if (!button) return;

        // Anahtar bir switch'tir: durum aria-checked ile söylenir; iç yüzeyine (SVG'lere) dokunulmaz.
        const night = this.theme === 'night';
        const next = night ? 'gündüz' : 'gece';

        button.setAttribute('aria-checked', String(night));
        button.setAttribute('aria-label', `${next} temasına geç`);
        button.title = `Şu an ${night ? 'gece' : 'gündüz'} teması — ${next} temasına geç`;
    },

    toggleTheme() {
        const next = this.theme === 'night' ? 'day' : 'night';

        this.applyTheme(next);
        storage.saveTheme(next);
    },

    // ---------- Bildirim ----------
    /** Ekranda duran en fazla fiş sayısı; yenisi gelince en eskisi düşer. */
    MAX_TOASTS: 8,

    /**
     * Fişler tıklamayı geçirir (CSS'te pointer-events: none): erken kapatma yok,
     * 3,8 saniyede kendiliğinden düşer - karşılığında altındaki düğme çalışır.
     */
    toast(message, tone = 'info') {
        const container = document.getElementById('toasts');
        if (!container) return;

        const toast = ui.create('<div class="toast" role="status"><span></span></div>');
        toast.dataset.tone = tone;
        // textContent: mesajlar personel ismi taşıyabilir.
        toast.querySelector('span').textContent = String(message);

        const remove = () => {
            if (!toast.isConnected) return;
            toast.classList.add('is-out');
            setTimeout(() => toast.remove(), 200);
        };

        // Fişler birikmesin: ekranın sağındaki liste en fazla MAX_TOASTS satır tutar.
        while (container.children.length >= this.MAX_TOASTS) container.lastElementChild.remove();

        container.prepend(toast);
        setTimeout(remove, 3800);
    },

    // ---------- Durum satırı ----------
    /** Belge altlığındaki son mesaj; ton yalnızca satırın rengini belirler. */
    status(text, tone = 'info') {
        const line = document.getElementById('statusLine');
        if (!line) return;

        line.textContent = `${text} · ${dates.clockLabel()}`;
        line.dataset.tone = tone;
    },

    // ---------- Pencere ----------
    closeHooks: new Map(),

    /** Pencere içinde gezinebilen öğeler (odaklama ve odak tuzağı için tek liste). */
    FOCUSABLE: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',

    /** Kim açtıysa kapatınca odak ona döner (klavye için); iç içe pencerelerde yığın. */
    openers: [],

    onClose(modalId, handler) {
        this.closeHooks.set(modalId, handler);
    },

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        this.openers.push(document.activeElement);
        modal.hidden = false;
        // Pencere açıkken arka plan kaydırılamaz; scrollbar-gutter sayesinde genişlik kayması da olmaz.
        document.documentElement.classList.add('is-locked');

        // Odak pencerenin İÇİNE girer: alanı olmayan pencerelerde (Hakkında, Yük analizi)
        // klavye kullanıcısı arka sayfada kalmasın.
        const target = modal.querySelector('[data-autofocus]') || modal.querySelector(this.FOCUSABLE);
        if (target) setTimeout(() => {
            // confirm() kendi düğmesine hemen odaklandıysa o odak geri çalınmaz.
            if (modal.contains(document.activeElement)) return;
            target.focus();
        }, 60);
    },

    /** Tab, en üstteki açık pencerenin içinde döner; arka plandaki düğmelere kaçmaz. */
    trapFocus(event) {
        const stack = document.querySelectorAll('.modal:not([hidden])');
        const top = stack[stack.length - 1];
        if (!top) return;

        const items = [...top.querySelectorAll(this.FOCUSABLE)].filter(el => !el.disabled && el.offsetParent !== null);
        if (!items.length) { event.preventDefault(); return; }

        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;

        if (!top.contains(active)) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.hidden = true;

        const opener = this.openers.pop();
        if (opener && opener.isConnected && typeof opener.focus === 'function') opener.focus();

        // Son pencere de kapandıysa belge yine kaydırılabilir hâle gelir.
        if (!document.querySelector('.modal:not([hidden])')) {
            document.documentElement.classList.remove('is-locked');
        }
    },

    /** Kapanış her zaman kancadan geçer; "kapat" ile "kaydet" ayrışmaz. */
    requestClose(modalId) {
        const hook = this.closeHooks.get(modalId);
        if (hook) hook();
        else this.closeModal(modalId);
    },

    initDialogs() {
        // Soruya Esc ile cevap vermek "Vazgeç" ile aynıdır.
        this.onClose('confirmModal', () => this.settleConfirm(false));

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') { this.trapFocus(event); return; }
            if (event.key !== 'Escape') return;

            // Üst üste pencerelerde eşit z-index DOM sırasına göre çizilir:
            // Esc en üsttekini kapatmalı, bu yüzden DOM'daki SON açık pencere seçilir.
            const stack = document.querySelectorAll('.modal:not([hidden])');
            const top = stack[stack.length - 1];

            if (top) this.requestClose(top.id);
        });

        document.addEventListener('click', (event) => {
            const closer = event.target.closest('[data-close]');
            if (closer) {
                this.requestClose(closer.dataset.close);
                return;
            }
            const dialog = event.target.closest('.modal');
            if (dialog && event.target === dialog) this.requestClose(dialog.id);
        });
    },

    // ---------- Onay kutusu ----------
    confirmPromise: null,
    confirmHandlers: null,

    /** window.confirm yerine: belge dilinde, güvenli seçeneğe odaklanan soru. */
    confirm({ title = 'Onay', message = '', okText = 'Tamam', danger = false } = {}) {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;

        const okButton = document.getElementById('confirmOk');
        const cancelButton = document.getElementById('confirmCancel');

        okButton.textContent = okText;
        okButton.classList.toggle('danger', danger);

        this.openModal('confirmModal');
        (danger ? cancelButton : okButton).focus();

        return new Promise((resolve) => {
            // Yeni soru, öncekini askıda bırakmadan iptal eder.
            this.settleConfirm(false);
            this.confirmPromise = resolve;

            const finish = (answer) => this.settleConfirm(answer);
            this.confirmHandlers = { ok: () => finish(true), cancel: () => finish(false) };

            okButton.addEventListener('click', this.confirmHandlers.ok, { once: true });
            cancelButton.addEventListener('click', this.confirmHandlers.cancel, { once: true });
        });
    },

    settleConfirm(answer) {
        if (!this.confirmPromise) return;

        const resolve = this.confirmPromise;
        this.confirmPromise = null;

        // once bağlı olsa da kullanılmayan dinleyiciler düğmelerde kalır; sonraki bir
        // soru eski düğmeye tıklanınca iki kez cevaplanmasın diye bağ burada çözülür.
        if (this.confirmHandlers) {
            document.getElementById('confirmOk').removeEventListener('click', this.confirmHandlers.ok);
            document.getElementById('confirmCancel').removeEventListener('click', this.confirmHandlers.cancel);
            this.confirmHandlers = null;
        }

        this.closeModal('confirmModal');
        resolve(answer);
    }
};

// ---------- Küresel hata sınırı ----------
(() => {
    const NOISE = [
        'resizeobserver', 'script error.', 'extension', 'top.globalevent',
        'null is not an object', 'permission denied', "evaluating 'e.getattribute'", 'loading chunk'
    ];

    const isNoise = (value) => {
        const text = String(value || '').toLowerCase();
        return NOISE.some(pattern => text.includes(pattern));
    };

    let lastToastAt = 0;
    const notify = (message, tone) => {
        // Bozuk bir döngü yüzlerce hata üretebilir; tek fiş yeter.
        if (Date.now() - lastToastAt < 4000) return;
        lastToastAt = Date.now();
        ui.toast(message, tone);
    };

    window.onerror = (message, url, line, column, error) => {
        console.error('Yakalanan hata:', { message, url, line, column, error });
        if (!isNoise(message)) notify('Beklenmedik bir hata oluştu. Verileriniz güvende.', 'error');
        return true;
    };

    window.onunhandledrejection = (event) => {
        console.error('Karşılanmayan promise reddi:', event.reason);
        if (!isNoise(event.reason)) notify('Bir işlem tamamlanamadı.', 'warn');
    };
})();
