/* OpenDraw WebUI v.3.1 - autosave to localStorage, project validation, theme persistence
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
Object.assign(DrawingApp.prototype, {
    // Autosave -----------------------------------------------------------
    persistSession() {
        if (this.persistTimer) clearTimeout(this.persistTimer);
        this.persistTimer = setTimeout(() => this.writeSession(), 600);
    },

    writeSession() {
        if (this.persistTimer) {
            clearTimeout(this.persistTimer);
            this.persistTimer = null;
        }
        try {
            const payload = {
                version: APP_VERSION,
                elements: this.elements,
                view: { offsetX: this.offsetX, offsetY: this.offsetY, zoomLevel: this.zoomLevel },
                style: {
                    strokeColor: document.getElementById('strokeColor').value,
                    fillColor: document.getElementById('fillColor').value,
                    strokeWidth: document.getElementById('strokeWidth').value
                }
            };
            localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(payload));
            this.autosaveBroken = false;
        } catch (error) {
            // Embedded images can push the drawing past the storage quota; say it once, not
            // on every following edit.
            if (!this.autosaveBroken) {
                this.autosaveBroken = true;
                this.toast('Autosave is full - export the drawing to keep it.', 'error');
            }
        }
    },

    restoreSession() {
        let raw = null;
        try {
            raw = localStorage.getItem(STORAGE_KEYS.session);
        } catch (error) {
            return;                     // storage blocked (e.g. some private modes)
        }
        if (!raw) return;

        try {
            const saved = JSON.parse(raw);
            if (saved && Array.isArray(saved.elements)) {
                const restored = this.sanitizeElements(saved.elements);
                if (restored.length) this.elements = restored;
            }
            if (saved && saved.view) {
                this.offsetX = this.toNumber(saved.view.offsetX, this.offsetX);
                this.offsetY = this.toNumber(saved.view.offsetY, this.offsetY);
                this.zoomLevel = Math.max(0.1, Math.min(5, this.toNumber(saved.view.zoomLevel, this.zoomLevel)));
            }
            if (saved && saved.style) {
                const opposite = this.isDarkMode ? THEME_DEFAULTS.light : THEME_DEFAULTS.dark;
                const current = this.isDarkMode ? THEME_DEFAULTS.dark : THEME_DEFAULTS.light;
                let strokeColor = saved.style.strokeColor;
                // A stroke that is still the *other* theme's default was never chosen on purpose,
                // and on this canvas it would be invisible - use this theme's default instead.
                if (strokeColor && strokeColor.toLowerCase() === opposite.stroke) strokeColor = current.stroke;
                if (strokeColor) document.getElementById('strokeColor').value = strokeColor;
                if (saved.style.fillColor) document.getElementById('fillColor').value = saved.style.fillColor;
                if (saved.style.strokeWidth) document.getElementById('strokeWidth').value = saved.style.strokeWidth;
            }
        } catch (error) {
            console.warn('The saved drawing could not be restored.', error);
        }
    },

    // Shared by import and autosave restore: repeated ids would confuse deletion, the eraser
    // and the drawable cache, so a collision gets a fresh id.
    sanitizeElements(list) {
        const seen = new Set();
        const elements = [];
        for (const raw of list) {
            const element = this.sanitizeElement(raw);
            if (!element) continue;
            if (seen.has(element.id)) element.id = this.uid();
            seen.add(element.id);
            elements.push(element);
        }
        return elements;
    },

    // Guards Import and autosave against hand-edited or truncated project files
    sanitizeElement(raw) {
        if (!raw || typeof raw !== 'object' || !VALID_TYPES.includes(raw.type)) return null;
        const color = (value, fallback) => (/^#[0-9a-f]{6}$/i.test(value) ? value : fallback);
        // A fill is allowed to stay transparent: roughOptionsFor() deliberately leaves the fill
        // unset for it, and projects saved by older builds spell the same thing "none".
        const fill = (value) => {
            if (typeof value !== 'string') return '#ffffff';
            const v = value.trim().toLowerCase();
            if (v === '' || v === 'transparent' || v === 'none') return 'transparent';
            return /^#[0-9a-f]{6}$/.test(v) ? v : '#ffffff';
        };
        const element = {
            id: (typeof raw.id === 'string' && raw.id) || (typeof raw.id === 'number' && String(raw.id)) || this.uid(),
            type: raw.type,
            x: this.toNumber(raw.x, 0),
            y: this.toNumber(raw.y, 0),
            width: this.toNumber(raw.width, 0),
            height: this.toNumber(raw.height, 0),
            strokeColor: color(raw.strokeColor, '#000000'),
            fillColor: fill(raw.fillColor),
            strokeWidth: Math.max(1, Math.min(50, this.toNumber(raw.strokeWidth, 2)))
        };
        if (raw.roughness !== undefined) {
            element.roughness = Math.max(0, Math.min(4, this.toNumber(raw.roughness, 1)));
        }
        if (element.type === 'pen') {
            element.path = Array.isArray(raw.path)
                ? raw.path.filter(point => point && isFinite(point.x) && isFinite(point.y)).map(point => ({ x: point.x, y: point.y }))
                : [];
            // A single point cannot be hit-tested or erased, so it is not a usable stroke
            if (element.path.length < 2) return null;
        }
        if (element.type === 'arrow' && raw.arrowheadSize !== undefined) {
            // only an explicit size is stored; otherwise the head follows the line thickness
            element.arrowheadSize = Math.max(1, this.toNumber(raw.arrowheadSize, LEGACY_ARROW_HEAD));
        }
        if (element.type === 'text') {
            element.text = typeof raw.text === 'string' ? raw.text : '';
            element.fontSize = Math.max(TEXT_MIN_FONT, Math.min(TEXT_MAX_FONT, this.toNumber(raw.fontSize, TEXT_DEFAULT_SIZE)));
            // Re-measured: the stored box depends on the fonts available in this browser
            this.measureTextElement(element);
        }
        if (element.type === 'image') element.src = typeof raw.src === 'string' ? raw.src : '';
        return element;
    },

    toNumber(value, fallback) {
        const number = Number(value);
        return isFinite(number) ? number : fallback;
    },

    // Theme toggle
    loadTheme() {
        let saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEYS.theme);
        } catch (error) {
            saved = null;
        }
        this.applyTheme(saved === 'dark');
    },

    toggleTheme() {
        const strokeInput = document.getElementById('strokeColor');
        const from = this.isDarkMode ? THEME_DEFAULTS.dark : THEME_DEFAULTS.light;
        const to = this.isDarkMode ? THEME_DEFAULTS.light : THEME_DEFAULTS.dark;
        // Only replace the pen colour while it is still the default of the previous theme:
        // black strokes are invisible on the dark canvas, but a custom colour must survive.
        if (strokeInput.value.toLowerCase() === from.stroke) strokeInput.value = to.stroke;
        this.applyTheme(!this.isDarkMode);
    },

    applyTheme(dark) {
        this.isDarkMode = dark;
        document.body.classList.toggle('dark-mode', dark);
        try {
            localStorage.setItem(STORAGE_KEYS.theme, dark ? 'dark' : 'light');
        } catch (error) {
            // Storage unavailable: the theme simply resets on the next visit
        }
        this.updateThemeIcon();
        this.syncTextEditOverlay();
        this.scheduleRedraw();
        this.persistSession();
    },

    updateThemeIcon() {
        this.themeToggleBtn.innerHTML = this.isDarkMode ? this.moonIconSVG : this.sunIconSVG;
        this.themeToggleBtn.setAttribute('aria-label', this.isDarkMode ? 'Switch to light theme' : 'Switch to dark theme');
    }
});
