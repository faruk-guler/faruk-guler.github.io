/* OpenDraw WebUI v.3.1 - pointer gestures: drawing, panning, dragging, resizing, erasing, wheel zoom
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
Object.assign(DrawingApp.prototype, {
    handlePointerDown(e) {
        // One pointer owns a gesture: a second finger (or a stray stylus) must not hijack the shape
        // that is already being drawn, which used to produce erratic strokes on touch screens.
        if (!this.acceptsPointer(e)) return;

        // Clicking outside an open label only commits it - using the same click to draw would
        // immediately spawn a second, empty label.
        if (this.editingElement) {
            this.finishTextEdit();
            return;
        }

        // Space + drag (excalidraw-style), or the middle/right button, pans the canvas.
        // Returning before any drawing starts is what kept a hidden zero-size shape from being
        // added on every pan.
        if (this.keys['Space'] || e.button === 1 || e.button === 2) {
            e.preventDefault();
            this.isPanning = true;
            this.gesturePointerId = e.pointerId;
            this.lastPanX = e.clientX;
            this.lastPanY = e.clientY;
            this.capturePointer(e);
            this.canvas.style.cursor = 'grabbing';
            return;
        }

        if (e.pointerType === 'mouse' && e.button !== 0) return;   // ignore back/forward buttons

        this.gesturePointerId = e.pointerId;
        const pos = this.getWorldPos(e);
        this.startX = pos.x;
        this.startY = pos.y;
        this.capturePointer(e);

        // A gesture remembers the tool that started it. Reading currentTool instead would let
        // a shortcut key pressed mid-drag re-interpret the running gesture - it threw, and the
        // half-drawn shape stayed on screen while it was gone from the model.
        this.activeTool = this.currentTool;

        if (this.currentTool === 'select') {
            this.isDrawing = true;
            const handleType = this.getHandleAt(pos.x, pos.y, this.selectedElement);
            if (this.selectedElement && handleType) {
                this.isResizing = true;
                this.resizeHandle = handleType;
                const element = this.selectedElement;
                this.initialBounds = {
                    x: element.x,
                    y: element.y,
                    width: element.width,
                    height: element.height,
                    fontSize: element.fontSize || TEXT_DEFAULT_SIZE
                };
            } else {
                const clickedElement = this.getElementAt(pos.x, pos.y);
                this.selectElement(clickedElement);
                if (clickedElement) {
                    this.dragState = {
                        startX: clickedElement.x,
                        startY: clickedElement.y,
                        grabX: pos.x - clickedElement.x,
                        grabY: pos.y - clickedElement.y,
                        path: clickedElement.path ? clickedElement.path.map(p => ({ x: p.x, y: p.y })) : null
                    };
                }
            }
            this.gestureElement = this.selectedElement;
            this.scheduleRedraw();
            return;
        }

        if (this.currentTool === 'text') {
            this.startTextEdit(this.createElement('text', pos.x, pos.y, pos.x, pos.y));
            return;
        }

        this.isDrawing = true;

        if (this.activeTool === 'pen') {
            this.penPath = [{ x: pos.x, y: pos.y }];
            this.currentElement = this.createElement('pen', pos.x, pos.y, pos.x, pos.y);
            this.currentElement.path = this.penPath;
        } else if (this.activeTool === 'eraser') {
            this.erasedCount = 0;
            this.lastErasePos = { x: pos.x, y: pos.y };
            this.eraseAt(pos);            // a single tap must already remove a shape
        } else {
            this.currentElement = this.createElement(this.activeTool, pos.x, pos.y, pos.x, pos.y);
        }
    },

    handlePointerMove(e) {
        if (this.gesturePointerId !== null && e.pointerId !== this.gesturePointerId) return;

        if (this.isPanning) {
            this.offsetX += e.clientX - this.lastPanX;
            this.offsetY += e.clientY - this.lastPanY;
            this.lastPanX = e.clientX;
            this.lastPanY = e.clientY;
            this.scheduleRedraw();
            return;
        }

        if (!this.isDrawing) {
            this.updateHoverCursor(e);
            return;
        }

        const pos = this.getWorldPos(e);

        if (this.activeTool === 'select' && this.selectedElement) {
            if (this.isResizing) this.resizeSelectedElement(pos);
            else this.dragSelectedElement(pos);
            this.scheduleRedraw();
        } else if (this.activeTool === 'pen') {
            const last = this.penPath[this.penPath.length - 1];
            // Skip sub-pixel moves: they inflate the path and the exported JSON
            if (!last || Math.abs(pos.x - last.x) + Math.abs(pos.y - last.y) >= 1.5) {
                this.penPath.push({ x: pos.x, y: pos.y });
                this.currentElement.path = this.penPath;
                this.invalidateDrawable(this.currentElement);
                this.scheduleRedraw();
            }
        } else if (this.activeTool === 'eraser') {
            this.eraseAlong(pos);
        } else if (this.currentElement) {
            this.currentElement.width = pos.x - this.startX;
            this.currentElement.height = pos.y - this.startY;
            this.invalidateDrawable(this.currentElement);
            this.scheduleRedraw();
        }
    },

    handlePointerUp(e) {
        if (this.gesturePointerId !== null && e.pointerId !== this.gesturePointerId) return;
        this.releasePointer(e);
        this.gesturePointerId = null;

        if (this.isPanning) {
            this.isPanning = false;
            this.canvas.style.cursor = this.cursorForTool();
            this.persistSession();          // remember where the user was looking
        }

        if (!this.isDrawing) return;
        this.isDrawing = false;

        const gesture = this.activeTool;
        const element = this.currentElement;
        const selection = this.gestureElement;
        const resizing = this.isResizing;
        const bounds = this.initialBounds;
        const drag = this.dragState;

        // Interaction state is cleared whatever happened in between, so a stale handle or
        // drag origin can never be applied to the next element.
        this.gestureElement = null;
        this.isResizing = false;
        this.resizeHandle = null;
        this.initialBounds = null;
        this.dragState = null;

        if (gesture === 'select') {
            if (selection) {
                const moved = drag && (selection.x !== drag.startX || selection.y !== drag.startY);
                const resized = resizing && this.geometryChanged(selection, bounds);
                if (resized || moved) {
                    if (resizing) this.normalizeElement(selection);
                    this.invalidateDrawable(selection);
                    this.saveState();
                }
            }
        } else if (gesture === 'eraser') {
            // One undo step per stroke, and nothing recorded when the stroke erased nothing
            if (this.erasedCount > 0) this.saveState();
            this.erasedCount = 0;
            this.lastErasePos = null;
        }

        if (!element) {
            this.scheduleRedraw();
            return;
        }

        if (gesture === 'pen') {
            if (Array.isArray(element.path) && element.path.length > 1) {
                this.elements.push(element);
                // Select what was just drawn: otherwise a thin arrow or stroke has to be hit
                // exactly to be moved, and style controls silently apply to nothing.
                this.selectElement(element);
                this.saveState();
            }
        } else {
            // A click that was not a real drag must not leave an invisible shape behind.
            // Lines and arrows are measured by length, a flat line is perfectly valid.
            const linear = gesture === 'line' || gesture === 'arrow';
            const largeEnough = linear
                ? Math.hypot(element.width, element.height) >= MIN_SHAPE_SIZE
                : Math.abs(element.width) >= MIN_SHAPE_SIZE && Math.abs(element.height) >= MIN_SHAPE_SIZE;
            if (largeEnough) {
                this.normalizeElement(element);
                this.elements.push(element);
                this.selectElement(element);
                this.saveState();
            }
        }

        this.currentElement = null;
        this.penPath = [];
        this.scheduleRedraw();
    },

    // Grabbing a handle and releasing it without moving must not add an empty undo step
    geometryChanged(element, bounds) {
        if (!bounds) return false;
        return element.x !== bounds.x || element.y !== bounds.y ||
            element.width !== bounds.width || element.height !== bounds.height ||
            (element.fontSize !== undefined && element.fontSize !== bounds.fontSize);
    },

    dragSelectedElement(pos) {
        const element = this.selectedElement;
        if (!element || !this.dragState) return;
        const dx = pos.x - (this.dragState.startX + this.dragState.grabX);
        const dy = pos.y - (this.dragState.startY + this.dragState.grabY);

        element.x = this.dragState.startX + dx;
        element.y = this.dragState.startY + dy;
        if (element.path && this.dragState.path) {
            element.path = this.dragState.path.map(p => ({ x: p.x + dx, y: p.y + dy }));
        }
        this.syncTextEditOverlay();
    },

    resizeSelectedElement(pos) {
        const element = this.selectedElement;
        const bounds = this.initialBounds;
        if (!element || !bounds) return;

        const dx = pos.x - this.startX;
        const dy = pos.y - this.startY;

        if (element.type === 'text') {
            // A label is scaled by its font size: whichever drag direction is dominant wins
            const sizeChange = Math.abs(dx) > Math.abs(dy) ? dx : dy;
            const fontSize = bounds.fontSize + sizeChange / 2; // /2 keeps the handle under the cursor
            element.fontSize = Math.max(TEXT_MIN_FONT, Math.min(TEXT_MAX_FONT, fontSize));
            this.measureTextElement(element);
            this.syncTextEditOverlay();
            this.invalidateDrawable(element);
            return;
        }

        let newX = bounds.x;
        let newY = bounds.y;
        let newWidth = bounds.width;
        let newHeight = bounds.height;

        switch (this.resizeHandle) {
            case 'tl':
                newX = bounds.x + dx; newY = bounds.y + dy;
                newWidth = bounds.width - dx; newHeight = bounds.height - dy;
                break;
            case 'tm':
                newY = bounds.y + dy; newHeight = bounds.height - dy;
                break;
            case 'tr':
                newY = bounds.y + dy;
                newWidth = bounds.width + dx; newHeight = bounds.height - dy;
                break;
            case 'ml':
                newX = bounds.x + dx; newWidth = bounds.width - dx;
                break;
            case 'mr':
                newWidth = bounds.width + dx;
                break;
            case 'bl':
                newX = bounds.x + dx; newWidth = bounds.width - dx; newHeight = bounds.height + dy;
                break;
            case 'bm':
                newHeight = bounds.height + dy;
                break;
            case 'br':
                newWidth = bounds.width + dx; newHeight = bounds.height + dy;
                break;
        }

        // Shapes may be squashed to nothing while dragging, but never inverted: the sign is
        // kept and normalizeElement() flips the origin once the drag ends.
        if (Math.abs(newWidth) < 1) newWidth = Math.sign(newWidth || 1);
        if (Math.abs(newHeight) < 1) newHeight = Math.sign(newHeight || 1);

        element.x = newX;
        element.y = newY;
        element.width = newWidth;
        element.height = newHeight;
        this.invalidateDrawable(element);
    },

    handleDoubleClick(e) {
        const pos = this.getWorldPos(e);
        const element = this.getElementAt(pos.x, pos.y);
        if (element && element.type === 'text') {
            this.setTool('select');
            this.selectElement(element);
            this.startTextEdit(element);
        } else if (!element && this.currentTool !== 'eraser') {
            this.startTextEdit(this.createElement('text', pos.x, pos.y, pos.x, pos.y));
        }
    },

    handleWheel(e) {
        e.preventDefault();

        if (e.shiftKey) {                   // shift + wheel pans horizontally
            this.offsetX -= (e.deltaX || e.deltaY);
            this.scheduleRedraw();
            this.persistSession();
            return;
        }

        const zoomIntensity = 0.1;
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const oldZoom = this.zoomLevel;
        let newZoom = e.deltaY < 0 ? oldZoom * (1 + zoomIntensity) : oldZoom / (1 + zoomIntensity);
        newZoom = Math.max(0.1, Math.min(5, newZoom)); // Limit zoom level

        // Keep the point under the cursor where it is
        const worldX = (mouseX - this.offsetX) / oldZoom;
        const worldY = (mouseY - this.offsetY) / oldZoom;

        this.offsetX = mouseX - worldX * newZoom;
        this.offsetY = mouseY - worldY * newZoom;
        this.zoomLevel = newZoom;

        this.scheduleRedraw();
        this.persistSession();
    },

    // The eraser removes whole shapes; everything under the tip goes in one stroke.
    eraseAt(pos) {
        const kept = this.elements.filter(element => !this.isPointInElement(pos.x, pos.y, element, true));
        const removed = this.elements.length - kept.length;
        if (!removed) return;

        if (this.selectedElement && !kept.includes(this.selectedElement)) this.selectElement(null);
        this.elements = kept;
        this.erasedCount += removed;
        this.scheduleRedraw();
    },

    // A quick swipe would otherwise jump straight over thin shapes: sample the segment from
    // the previous position so nothing slips through between two pointer events.
    eraseAlong(pos) {
        const previous = this.lastErasePos;
        this.lastErasePos = { x: pos.x, y: pos.y };
        if (!previous) {
            this.eraseAt(pos);
            return;
        }
        const distance = Math.hypot(pos.x - previous.x, pos.y - previous.y);
        const step = Math.max(1, this.eraserRadius / 2);
        for (let travelled = 0; travelled < distance; travelled += step) {
            const ratio = travelled / distance;
            this.eraseAt({
                x: previous.x + (pos.x - previous.x) * ratio,
                y: previous.y + (pos.y - previous.y) * ratio
            });
        }
        this.eraseAt(pos);
    }
});
