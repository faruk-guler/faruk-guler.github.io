/* OpenDraw WebUI v.3.1 - text labels: measurement and the on-canvas editing overlay
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
Object.assign(DrawingApp.prototype, {
    textLines(element) {
        return String(element.text || '').split('\n');
    },

    // Measured with a private identity-transformed context: the visible canvas carries the
    // pan/zoom/device-pixel-ratio transform, which must not influence the stored size.
    measureText(text, fontSize) {
        this.measureCtx.font = `${fontSize}px ${FONT_STACK}`;
        const lines = String(text || '').split('\n');
        let width = 0;
        for (const line of lines) width = Math.max(width, this.measureCtx.measureText(line).width);
        return {
            width: Math.max(TEXT_MIN_WIDTH, width),
            height: lines.length * fontSize * TEXT_LINE_HEIGHT
        };
    },

    measureTextElement(element) {
        const metrics = this.measureText(element.text || '', element.fontSize || TEXT_DEFAULT_SIZE);
        element.width = metrics.width;
        element.height = metrics.height;
        return metrics;
    },

    startTextEdit(element) {
        if (!element || element.type !== 'text') return;
        const input = this.textInput;
        this.editingElement = element;
        this.editIsNew = !this.elements.includes(element);
        input.value = element.text || '';
        input.hidden = false;
        this.selectElement(element);
        this.syncTextEditOverlay();
        input.focus({ preventScroll: true });
        input.setSelectionRange(input.value.length, input.value.length);
        this.scheduleRedraw();
    },

    // Glued to the element in screen space, and grown with what has been typed so far
    syncTextEditOverlay() {
        const element = this.editingElement;
        const input = this.textInput;
        if (!element || input.hidden) return;

        const fontSize = element.fontSize || TEXT_DEFAULT_SIZE;
        const metrics = this.measureText(input.value || ' ', fontSize);
        const minWidth = Math.max(EDITOR_MIN_WIDTH, fontSize * EDITOR_WIDTH_PER_FONT);
        // the box must both offer a comfortable target and follow the typed text as it grows
        const wantedWidth = Math.max(minWidth, metrics.width + EDITOR_PAD_X);
        const wantedHeight = Math.max(metrics.height, fontSize * TEXT_LINE_HEIGHT * EDITOR_MIN_LINES);

        input.style.left = `${element.x * this.zoomLevel + this.offsetX}px`;
        input.style.top = `${element.y * this.zoomLevel + this.offsetY}px`;
        input.style.fontSize = `${fontSize * this.zoomLevel}px`;
        input.style.color = element.strokeColor;
        // Only the box grows; the text still starts exactly at the element origin, so the
        // overlay and the committed label stay pixel aligned (no padding on the textarea).
        input.style.width = `${wantedWidth * this.zoomLevel}px`;
        input.style.height = `${wantedHeight * this.zoomLevel + EDITOR_PAD_Y}px`;
    },

    closeTextEdit() {
        const input = this.textInput;
        // Clear the session before hiding: setting hidden synchronously fires the textarea's
        // blur handler, which would otherwise re-enter finishTextEdit() and add the label twice
        this.editingElement = null;
        this.editIsNew = false;
        input.hidden = true;
        input.value = '';
    },

    finishTextEdit() {
        const element = this.editingElement;
        if (!element) return;
        const text = this.textInput.value;
        const wasNew = this.editIsNew;
        this.closeTextEdit();

        if (wasNew) {
            // A label that was just clicked into existence and left empty is dropped
            if (!text.trim()) {
                this.selectElement(null);
                this.scheduleRedraw();
                return;
            }
            element.text = text;
            this.measureTextElement(element);
            this.elements.push(element);
            this.selectElement(element);
            this.saveState();
        } else if (!text.trim()) {
            // Clearing the text of an existing label removes it, like most editors
            this.deleteElement(element);
            this.saveState();
        } else if (text !== element.text) {
            element.text = text;
            this.measureTextElement(element);
            this.saveState();
        }
        this.scheduleRedraw();
    },

    cancelTextEdit() {
        const element = this.editingElement;
        if (!element) return;
        const wasNew = this.editIsNew;
        this.closeTextEdit();
        // Elements are only written on commit, so cancelling needs no rollback
        if (wasNew) this.selectElement(null);
        this.scheduleRedraw();
    }
});
