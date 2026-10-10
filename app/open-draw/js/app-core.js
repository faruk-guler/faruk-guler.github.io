/* OpenDraw WebUI v.3.1 - the DrawingApp class: construction, start-up, event wiring, tool state, dialogs, notices
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js.
   Shared constants live in js/config.js. */
class DrawingApp {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.measureCtx = document.createElement('canvas').getContext('2d');
        this.toastStack = document.getElementById('toastStack');
        this.textInput = document.getElementById('textInput');

        if (typeof rough === 'undefined') {
            this.toast('rough.js did not load - drawing is unavailable.', 'error');
            return;
        }
        this.rc = rough.canvas(this.canvas); // Initialize Rough.js

        this.elements = [];
        this.history = [];        // serialized snapshots, see saveState()
        this.historyIndex = -1;
        this.currentTool = 'select';
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.currentElement = null;
        this.selectedElement = null; // Only single selection now
        this.clipboard = null; // Only single element clipboard
        this.penPath = [];
        this.eraserRadius = 10;
        this.selectionTolerance = 5;
        this.roughness = 1; // Controls the "sketchiness" of Rough.js drawings (0 = clean, 1 = sketchy, 2 = rough)

        // Canvas pan and zoom
        this.offsetX = 0;
        this.offsetY = 0;
        this.zoomLevel = 1;
        this.isPanning = false;
        this.lastPanX = 0;
        this.lastPanY = 0;
        this.keys = {};
        this.dpr = window.devicePixelRatio || 1;
        this.viewWidth = 0;   // canvas size in CSS pixels (drawing units before zoom)
        this.viewHeight = 0;

        // Interaction state is kept here, never on the elements, so it cannot leak into
        // the undo history or the exported JSON.
        this.isResizing = false;
        this.resizeHandle = null;
        this.initialBounds = null;
        this.dragState = null;
        this.activeTool = 'select';   // the tool that owns the gesture in progress
        this.gestureElement = null;
        this.erasedCount = 0;     // shapes removed by the current eraser stroke
        this.lastErasePos = null; // previous eraser position, for sweeping fast strokes
        this.gesturePointerId = null;  // pointer that owns the current gesture (see acceptsPointer)

        // Text editing overlay state
        this.editingElement = null;
        this.editIsNew = false;

        // Rendering helpers
        this.redrawQueued = false;
        this.drawableCache = new Map(); // element id -> { sig, drawables }; keeps every shape
                                          // visually stable across redraws and avoids re-tessellation
        this.persistTimer = null;
        this.autosaveBroken = false;
        this.pendingImageLoads = new Set();  // element ids currently being decoded
        this.lastFocusedElement = null;      // restored when a dialog closes

        // Theme state
        this.isDarkMode = false;
        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.sunIconSVG = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
        `;
        this.moonIconSVG = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        `;

        this.init();
    }
}

Object.assign(DrawingApp.prototype, {
    init() {
        this.applyVersion();
        this.setupCanvas();
        this.setupEventListeners();
        this.loadTheme();
        this.restoreSession();
        this.saveState();
        this.redraw();
    },

    applyVersion() {
        const label = `OpenDraw WebUI v.${APP_VERSION}`;
        document.title = `${label} - farukguler.com`;
        document.getElementById('appTitleLabel').textContent = label;
        document.getElementById('aboutVersion').textContent = `v.${APP_VERSION}`;
    },

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    },

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.dpr = window.devicePixelRatio || 1;
        this.viewWidth = container.clientWidth;
        this.viewHeight = container.clientHeight;
        // The backing store uses device pixels so strokes stay sharp on HiDPI screens;
        // redraw() re-applies the ratio, so drawing coordinates remain CSS pixels.
        this.canvas.width = Math.max(1, Math.round(this.viewWidth * this.dpr));
        this.canvas.height = Math.max(1, Math.round(this.viewHeight * this.dpr));
        this.canvas.style.width = `${this.viewWidth}px`;
        this.canvas.style.height = `${this.viewHeight}px`;
        this.redraw();
    },

    setupEventListeners() {
        // Tool buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setTool(btn.dataset.tool));
        });

        // Canvas events - pointer events cover mouse, touch and stylus input, and with
        // setPointerCapture() below a drag still finishes when the pointer leaves the canvas.
        this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
        this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
        this.canvas.addEventListener('pointerup', (e) => this.handlePointerUp(e));
        this.canvas.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
        this.canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
        // passive:false is required because the wheel handler prevents the default page zoom
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // Keyboard events for panning and shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Color and stroke controls in main toolbar: "input" gives a live preview while the
        // picker is open, "change" writes a single undo step when the user is done.
        const strokeColor = document.getElementById('strokeColor');
        const fillColor = document.getElementById('fillColor');
        const strokeWidth = document.getElementById('strokeWidth');

        strokeColor.addEventListener('input', () => this.applyStyleToSelection('strokeColor', strokeColor.value, false));
        strokeColor.addEventListener('change', () => this.applyStyleToSelection('strokeColor', strokeColor.value, true));
        fillColor.addEventListener('input', () => this.applyStyleToSelection('fillColor', fillColor.value, false));
        fillColor.addEventListener('change', () => this.applyStyleToSelection('fillColor', fillColor.value, true));
        strokeWidth.addEventListener('input', () => this.applyStyleToSelection('strokeWidth', parseInt(strokeWidth.value, 10), false));
        strokeWidth.addEventListener('change', () => this.applyStyleToSelection('strokeWidth', parseInt(strokeWidth.value, 10), true));

        // Action buttons
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('clearBtn').addEventListener('click', () => this.requestClear());
        document.getElementById('resetViewBtn').addEventListener('click', () => this.getContentBounds() ? this.fitToContent() : this.resetView());
        document.getElementById('exportBtn').addEventListener('click', () => this.openModal('exportModal'));

        // Theme toggle button
        document.getElementById('themeToggleBtn').addEventListener('click', () => this.toggleTheme());

        // Scoped to the export dialog on purpose: the clear confirmation reuses the same button
        // style, and selecting by class alone made its Cancel/Clear buttons start an export too.
        document.querySelectorAll('#exportModal .export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const format = e.currentTarget.dataset.format;
                this.closeModal('exportModal');
                this.exportDrawing(format);
            });
        });

        document.getElementById('infoBtn').addEventListener('click', () => this.openModal('infoModal'));

        // Import / image: the trigger buttons are wired here instead of inline handlers, and
        // each file input is cleared as soon as a file is picked, so the same file works twice.
        document.getElementById('importTriggerBtn').addEventListener('click', () => document.getElementById('importBtn').click());
        document.getElementById('imageTriggerBtn').addEventListener('click', () => document.getElementById('imageInput').click());
        document.getElementById('importBtn').addEventListener('change', (e) => this.importDrawing(e));
        document.getElementById('imageInput').addEventListener('change', (e) => this.addImage(e));

        // Text editing overlay: keys here belong to the label, not to the canvas shortcuts
        this.textInput.addEventListener('keydown', (e) => {
            e.stopPropagation();
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.finishTextEdit();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.cancelTextEdit();
            }
        });
        this.textInput.addEventListener('input', () => this.syncTextEditOverlay());
        this.textInput.addEventListener('blur', () => {
            // A blur can be delivered one task late; if a new label is open and focused by
            // then, this stale event must not close the label the user is typing.
            if (this.editingElement && document.activeElement !== this.textInput) this.finishTextEdit();
        });

        // A lost window focus can swallow the keyup of Space/Ctrl and leave the app stuck in
        // pan mode - every later click would move the canvas instead of drawing a shape.
        window.addEventListener('blur', () => this.releaseAllKeys());
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.releaseAllKeys();
        });

        // Modal close buttons and click-outside
        ['exportModal', 'clearModal', 'infoModal'].forEach((id) => {
            const modal = document.getElementById(id);
            modal.querySelector('.close-btn').addEventListener('click', () => this.closeModal(id));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(id);
            });
        });

        // Clear confirmation: the destructive choice is only taken from the dialog, and it is
        // deliberately not the control the dialog opens with focus on.
        document.getElementById('confirmClearBtn').addEventListener('click', () => {
            this.closeModal('clearModal');
            this.clear();
        });
        document.getElementById('cancelClearBtn').addEventListener('click', () => this.closeModal('clearModal'));

        // Do not lose a drawing because the tab was closed with a pending autosave
        window.addEventListener('beforeunload', () => {
            if (this.persistTimer) this.writeSession();
        });
    },

    setTool(tool) {
        this.finishTextEdit();          // a pending label is committed, not silently lost
        this.currentTool = tool;
        document.querySelectorAll('.tool-btn').forEach(b => {
            const active = b.dataset.tool === tool;
            b.classList.toggle('active', active);
            b.setAttribute('aria-pressed', String(active));
        });
        if (tool !== 'select') this.selectElement(null);
        this.canvas.style.cursor = this.cursorForTool();
        this.scheduleRedraw();
    },

    selectElement(element) {
        this.selectedElement = element || null;
        this.updateToolbarsOnSelection();
    },

    // Style edits from the toolbar apply to the selection; with nothing selected the values
    // are simply the defaults for the next shape (handled in createElement()).
    applyStyleToSelection(property, value, saveToHistory) {
        const element = this.selectedElement;
        if (!element) return;
        // The width slider and the fill colour have no effect on a text label
        if ((property === 'strokeWidth' || property === 'fillColor') && element.type === 'text') return;
        element[property] = value;
        if (element.type === 'text') this.syncTextEditOverlay(); // live colour for the open editor
        this.invalidateDrawable(element);
        this.scheduleRedraw();
        if (saveToHistory) this.saveState();
    },

    updateToolbarsOnSelection() {
        const strokeColorInput = document.getElementById('strokeColor');
        const fillColorInput = document.getElementById('fillColor');
        const strokeWidthInput = document.getElementById('strokeWidth');

        if (this.selectedElement) {
            const isText = this.selectedElement.type === 'text';
            const isPen = this.selectedElement.type === 'pen';

            strokeColorInput.value = this.selectedElement.strokeColor || '#000000';

            // Pen strokes and text labels have no fill, and the width slider does not drive
            // the size of a label (drag its handles for that).
            fillColorInput.disabled = isPen || isText;
            strokeWidthInput.disabled = isText;
            if (!fillColorInput.disabled) {
                fillColorInput.value = this.selectedElement.fillColor || '#ffffff';
            }
            if (!strokeWidthInput.disabled) {
                strokeWidthInput.value = this.selectedElement.strokeWidth || 1;
            }
        } else {
            // When nothing is selected, ensure the toolbars are enabled for the next drawing.
            fillColorInput.disabled = false;
            strokeWidthInput.disabled = false;
        }
    },

    getWorldPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - this.offsetX) / this.zoomLevel;
        const y = (e.clientY - rect.top - this.offsetY) / this.zoomLevel;
        return { x, y };
    },

    cursorForTool() {
        if (this.isPanning) return 'grabbing';
        switch (this.currentTool) {
            case 'select': return 'default';
            case 'eraser': return 'cell';
            case 'text': return 'text';
            default: return 'crosshair';
        }
    },

    // Feedback for the resize handles of the current selection
    updateHoverCursor(e) {
        if (this.currentTool !== 'select') {
            this.canvas.style.cursor = this.cursorForTool();
            return;
        }
        const pos = this.getWorldPos(e);
        const handle = this.getHandleAt(pos.x, pos.y, this.selectedElement);
        this.canvas.style.cursor = handle ? HANDLE_CURSORS[handle] : (this.getElementAt(pos.x, pos.y) ? 'move' : 'default');
    },

    isTextEntryTarget(target) {
        if (!target) return false;
        const tag = target.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable === true;
    },

    handleKeyDown(e) {
        // While the pointer is inside a form field (or a label is being typed) the field owns
        // the keyboard - only Escape is intercepted.
        if (this.isTextEntryTarget(e.target)) {
            if (e.key === 'Escape' && this.editingElement) this.cancelTextEdit();
            return;
        }

        this.keys[e.code] = true;

        if (e.key === 'Escape') {
            const openModalId = this.getOpenModalId();
            if (openModalId) this.closeModal(openModalId);
            else if (this.editingElement) this.cancelTextEdit();
            else if (this.selectedElement) this.selectElement(null);
            else return;
            this.scheduleRedraw();
            return;
        }

        const openModalId = this.getOpenModalId();
        if (openModalId) {
            // The dialog owns the keyboard until it is closed; Tab must stay inside it,
            // otherwise aria-modal would be a promise the markup does not keep.
            if (e.key === 'Tab') this.trapFocus(e, document.getElementById(openModalId));
            return;
        }

        if (e.code === 'Space' && !this.isPanning) {
            e.preventDefault();             // stop the page scroll / focus jump
            this.canvas.style.cursor = 'grab';
            return;
        }

        const modifier = e.ctrlKey || e.metaKey;
        const key = e.key.toLowerCase();

        if (modifier) {
            switch (e.code) {
                case 'KeyZ':
                    e.preventDefault();
                    if (e.shiftKey) this.redo(); else this.undo();
                    break;
                case 'KeyY':
                    e.preventDefault();
                    this.redo();
                    break;
                case 'KeyC':
                    if (!this.selectedElement) return;   // let the browser copy text instead
                    e.preventDefault();
                    this.copySelectedElement();
                    break;
                case 'KeyX':
                    if (!this.selectedElement) return;
                    e.preventDefault();
                    this.cutSelectedElement();
                    break;
                case 'KeyV':
                    e.preventDefault();
                    this.pasteElement();
                    break;
                case 'KeyD':
                    if (!this.selectedElement) return;
                    e.preventDefault();
                    this.duplicateSelected();
                    break;
                case 'Digit0':
                    e.preventDefault();
                    this.resetView();
                    break;
                case 'BracketRight':
                    e.preventDefault();
                    this.changeZOrder(1);
                    break;
                case 'BracketLeft':
                    e.preventDefault();
                    this.changeZOrder(-1);
                    break;
            }
            return;
        }

        if (e.shiftKey && e.code === 'Digit1') {
            e.preventDefault();
            this.fitToContent();
            return;
        }

        if (e.code === 'Delete' || e.code === 'Backspace') {
            if (this.selectedElement) {
                e.preventDefault();         // Backspace would otherwise navigate back
                this.deleteSelectedElement();
            }
            return;
        }

        if (!e.altKey && TOOL_SHORTCUTS[key]) this.setTool(TOOL_SHORTCUTS[key]);
    },

    handleKeyUp(e) {
        this.keys[e.code] = false;
        if (e.code === 'Space' && !this.isPanning) this.canvas.style.cursor = this.cursorForTool();
    },

    // Forget held keys (and any pan started with them) when the window loses focus
    releaseAllKeys() {
        this.keys = {};
        if (this.isPanning) {
            this.isPanning = false;
            this.canvas.style.cursor = this.cursorForTool();
        }
        // A drag interrupted by the window losing focus keeps the shape drawn so far instead of
        // leaving the gesture stuck halfway.
        if (this.isDrawing) this.handlePointerUp({ pointerId: this.gesturePointerId });
        this.gesturePointerId = null;
    },

    /* Only the pointer that started a gesture may continue it, so a second finger on a touchscreen
       cannot corrupt the shape in progress. */
    acceptsPointer(e) {
        return this.gesturePointerId === null || e.pointerId === this.gesturePointerId;
    },

    openModal(id, focusSelector = '.close-btn') {
        const modal = document.getElementById(id);
        if (modal.hidden) {
            this.lastFocusedElement = document.activeElement;
            modal.hidden = false;
            const target = modal.querySelector(focusSelector) || modal.querySelector('.close-btn');
            target.focus();
        }
    },

    closeModal(id) {
        const modal = document.getElementById(id);
        modal.hidden = true;
        if (this.lastFocusedElement && document.contains(this.lastFocusedElement)) {
            this.lastFocusedElement.focus();
        }
    },

    getOpenModalId() {
        const open = [...document.querySelectorAll('.modal')].find(m => !m.hidden);
        return open ? open.id : null;
    },

    // Cycle Tab / Shift+Tab through the controls of an open dialog
    trapFocus(event, modal) {
        const focusable = [...modal.querySelectorAll('button, input, select, [href]')]
            .filter(element => !element.disabled && element.getClientRects().length > 0);
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (!modal.contains(active)) {
            event.preventDefault();
            first.focus();
        } else if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    },

    // Short, self-dismissing notice instead of a blocking alert()
    toast(message, type = 'info') {
        if (!this.toastStack) return;
        const existing = [...this.toastStack.children].find(node => node.dataset.message === message);
        if (existing) existing.remove();

        const note = document.createElement('div');
        note.className = type === 'error' ? 'toast error' : 'toast';
        note.dataset.message = message;
        note.textContent = message;
        this.toastStack.appendChild(note);
        setTimeout(() => note.remove(), type === 'error' ? 6000 : 3200);
    },

    uid() {
        return (window.crypto && crypto.randomUUID)
            ? crypto.randomUUID()
            : `el-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    },

    // Pointer capture keeps a drag alive when the cursor leaves the canvas. A pointer that is
    // no longer active cannot be captured, which must not break the interaction.
    capturePointer(e) {
        try {
            this.canvas.setPointerCapture(e.pointerId);
        } catch (error) {
            // ignored: synthetic or already-released pointer
        }
    },

    releasePointer(e) {
        try {
            if (e && this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
        } catch (error) {
            // ignored: nothing was captured
        }
    }
});
