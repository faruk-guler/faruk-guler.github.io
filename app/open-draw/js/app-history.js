/* OpenDraw WebUI v.3.1 - undo/redo snapshots, clipboard, stacking order, view reset and fit
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
Object.assign(DrawingApp.prototype, {
    // History ---------------------------------------------------------------
    // Snapshots are stored as JSON strings, so live objects (and Image instances) can never
    // leak into the undo stack or an exported project.
    saveState() {
        const snapshot = JSON.stringify(this.elements);
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(snapshot);

        // Embedded pictures travel as data URLs inside every snapshot, so the stack is capped
        // by total size as well as by step count - otherwise 100 copies of one large image
        // quietly exhaust the tab's memory.
        let bytes = this.history.reduce((total, entry) => total + entry.length, 0);
        while (this.history.length > 2 && (this.history.length > MAX_HISTORY || bytes > MAX_HISTORY_CHARS)) {
            bytes -= this.history.shift().length;
        }
        this.historyIndex = this.history.length - 1;
        this.updateHistoryButtons();
        this.pruneDrawableCache();
        this.persistSession();
    },

    // Drawables of shapes that no longer exist would only waste memory
    pruneDrawableCache() {
        if (!this.drawableCache.size) return;
        const alive = new Set(this.elements.map(element => element.id));
        for (const id of this.drawableCache.keys()) {
            if (!alive.has(id)) this.drawableCache.delete(id);
        }
    },

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.applySnapshot();
        }
    },

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.applySnapshot();
        }
    },

    applySnapshot() {
        if (this.editingElement) this.closeTextEdit();   // an open label editor belongs to the old state
        this.elements = JSON.parse(this.history[this.historyIndex]);
        this.selectElement(null); // Deselect on undo/redo
        this.updateHistoryButtons();
        this.redraw();
        this.persistSession();    // otherwise a reload would resurrect the undone content
    },

    // The trash button never destroys work on its own. An empty canvas has nothing to confirm;
    // anything else goes through the dialog, which opens on Cancel so a stray Enter is harmless.
    requestClear() {
        this.finishTextEdit();
        if (!this.elements.length) {
            this.toast('The canvas is already empty.');
            return;
        }
        document.getElementById('clearModalCount').textContent = this.elements.length;
        this.openModal('clearModal', '#cancelClearBtn');
    },

    clear() {
        this.finishTextEdit();
        if (!this.elements.length) return;    // nothing to do, so no confirmation dialog
        this.elements = [];
        this.selectElement(null);
        this.saveState();                     // clearing stays undoable
        this.redraw();
        this.toast('Canvas cleared - Ctrl+Z brings it back.');
    },

    deleteElement(element) {
        this.elements = this.elements.filter(el => el.id !== element.id);
        if (this.selectedElement === element) this.selectElement(null);
        this.invalidateDrawable(element);
    },

    deleteSelectedElement() {
        if (!this.selectedElement) return;
        this.deleteElement(this.selectedElement);
        this.saveState();
        this.redraw();
    },

    // Clipboard functions (simplified for single element)
    copySelectedElement() {
        if (!this.selectedElement) return;
        // The Image object itself is not serialisable; the data URL in .src is what is copied
        this.clipboard = JSON.parse(JSON.stringify(this.selectedElement));
    },

    cutSelectedElement() {
        if (!this.selectedElement) return;
        this.copySelectedElement();
        this.deleteSelectedElement();
    },

    cloneElement(element, offset) {
        const copy = JSON.parse(JSON.stringify(element));
        copy.id = this.uid();
        copy.x += offset;
        copy.y += offset;
        if (Array.isArray(copy.path)) {
            copy.path = copy.path.map(point => ({ x: point.x + offset, y: point.y + offset }));
        }
        delete copy.image;    // recreated on demand by drawImageElement()
        return copy;
    },

    pasteElement() {
        if (!this.clipboard) return;
        const copy = this.cloneElement(this.clipboard, 20);
        this.elements.push(copy);
        this.selectElement(copy);
        this.saveState();
        this.redraw();
    },

    duplicateSelected() {
        if (!this.selectedElement) return;
        const copy = this.cloneElement(this.selectedElement, 20);
        this.elements.push(copy);
        this.selectElement(copy);
        this.saveState();
        this.redraw();
    },

    // Stacking order: there was no way to send a shape behind an overlapping one
    changeZOrder(direction) {
        const element = this.selectedElement;
        if (!element) return;
        const index = this.elements.indexOf(element);
        const target = index + (direction > 0 ? 1 : -1);
        if (index === -1 || target < 0 || target >= this.elements.length) return;
        [this.elements[index], this.elements[target]] = [this.elements[target], this.elements[index]];
        this.saveState();
        this.redraw();
    },

    // Show the user when Undo / Redo have nothing left to do
    updateHistoryButtons() {
        const undoButton = document.getElementById('undoBtn');
        const redoButton = document.getElementById('redoBtn');
        const canUndo = this.historyIndex > 0;
        const canRedo = this.historyIndex < this.history.length - 1;
        undoButton.disabled = !canUndo;
        redoButton.disabled = !canRedo;
        undoButton.title = canUndo ? 'Undo (Ctrl+Z)' : 'Nothing left to undo';
        redoButton.title = canRedo ? 'Redo (Ctrl+Y)' : 'Nothing left to redo';
    },

    // View ---------------------------------------------------------------
    resetView() {
        this.zoomLevel = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.redraw();
        this.persistSession();
    },

    fitToContent() {
        const bounds = this.getContentBounds();
        if (!bounds) {
            this.resetView();
            return;
        }
        const margin = EXPORT_PADDING * 2;
        const zoom = Math.min(
            (this.viewWidth - margin) / bounds.width,
            (this.viewHeight - margin) / bounds.height
        );
        this.zoomLevel = Math.max(0.1, Math.min(5, zoom));
        this.offsetX = (this.viewWidth - bounds.width * this.zoomLevel) / 2 - bounds.x * this.zoomLevel;
        this.offsetY = (this.viewHeight - bounds.height * this.zoomLevel) / 2 - bounds.y * this.zoomLevel;
        this.redraw();
        this.persistSession();
    }
});
