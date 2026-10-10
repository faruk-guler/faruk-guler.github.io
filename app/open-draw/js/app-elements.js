/* OpenDraw WebUI v.3.1 - shape factory and geometry: hit testing, bounds, resize handles, normalising
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
Object.assign(DrawingApp.prototype, {
    createElement(type, x, y, endX, endY, textContent = '') {
        const strokeColor = document.getElementById('strokeColor').value;
        const fillColor = document.getElementById('fillColor').value;
        const strokeWidth = parseInt(document.getElementById('strokeWidth').value, 10) || 1;
        const element = {
            id: this.uid(),
            type,
            x,
            y,
            width: endX - x,
            height: endY - y,
            strokeColor,
            fillColor,
            strokeWidth,
            // Stored per element so a drawing reopened later looks the same as when it was made
            roughness: this.roughness
        };

        if (type === 'pen') {
            element.path = [];
        } else if (type === 'image') {
            element.src = '';
            element.image = new Image(); // Will be loaded later
        } else if (type === 'text') {
            element.text = textContent;
            element.fontSize = TEXT_DEFAULT_SIZE;
            this.measureTextElement(element);
        }
        return element;
    },

    getElementAt(x, y) {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const element = this.elements[i];
            if (this.isPointInElement(x, y, element)) {
                return element;
            }
        }
        return null;
    },

    // Hit and eraser tolerances are given in screen pixels and converted to world units, so a
    // thin arrow stays grabbable when zoomed out and the eraser does not wipe half the canvas
    // when zoomed in (they used to be fixed world sizes, which inverted with the zoom).
    hitTolerance(isErasing) {
        return (isErasing ? this.eraserRadius : this.selectionTolerance) / this.zoomLevel;
    },

    isPointInElement(x, y, element, isErasing = false) {
        const { x: ex, y: ey, width, height } = element;
        const tolerance = this.hitTolerance(isErasing);

        if (element.type === 'rectangle' || element.type === 'image' || element.type === 'text') {
            const minX = Math.min(ex, ex + width) - tolerance;
            const maxX = Math.max(ex, ex + width) + tolerance;
            const minY = Math.min(ey, ey + height) - tolerance;
            const maxY = Math.max(ey, ey + height) + tolerance;
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        } else if (element.type === 'circle') {
            const centerX = ex + width / 2;
            const centerY = ey + height / 2;
            const radiusX = Math.abs(width) / 2;
            const radiusY = Math.abs(height) / 2;
            // Check if point is inside ellipse with tolerance
            const dx = (x - centerX) / (radiusX + tolerance);
            const dy = (y - centerY) / (radiusY + tolerance);
            return dx * dx + dy * dy <= 1;
        } else if (element.type === 'pen') {
            if (!element.path || element.path.length === 0) return false;
            for (let i = 0; i < element.path.length - 1; i++) {
                const p1 = element.path[i];
                const p2 = element.path[i + 1];
                const dist = this.getDistanceToSegment(x, y, p1.x, p1.y, p2.x, p2.y);
                if (dist <= (element.strokeWidth / 2) + tolerance) {
                    return true;
                }
            }
            return false;
        } else if (element.type === 'line' || element.type === 'arrow') {
            const x1 = ex;
            const y1 = ey;
            const x2 = ex + width;
            const y2 = ey + height;
            const dist = this.getDistanceToSegment(x, y, x1, y1, x2, y2);
            return dist <= (element.strokeWidth / 2) + tolerance;
        } else if (element.type === 'triangle') {
            // The bounding box alone would also hit the two empty corners next to the shape
            const minX = Math.min(ex, ex + width);
            const maxX = Math.max(ex, ex + width);
            const minY = Math.min(ey, ey + height);
            const maxY = Math.max(ey, ey + height);
            if (x < minX - tolerance || x > maxX + tolerance || y < minY - tolerance || y > maxY + tolerance) {
                return false;
            }
            const points = [
                [ex + width / 2, ey],
                [ex, ey + height],
                [ex + width, ey + height]
            ];
            return this.isPointInPolygon(x, y, points) ||
                this.getDistanceToSegment(x, y, points[0][0], points[0][1], points[1][0], points[1][1]) <= tolerance ||
                this.getDistanceToSegment(x, y, points[1][0], points[1][1], points[2][0], points[2][1]) <= tolerance ||
                this.getDistanceToSegment(x, y, points[2][0], points[2][1], points[0][0], points[0][1]) <= tolerance;
        } else if (element.type === 'cylinder') {
            const cylX = ex;
            const cylY = ey;
            const cylWidth = width;
            const cylHeight = height;
            const ellipseRadiusX = Math.abs(cylWidth) / 2;
            const ellipseRadiusY = Math.abs(cylHeight) / 8;

            const topEllipseCenterX = cylX + cylWidth / 2;
            const topEllipseCenterY = cylY + ellipseRadiusY;
            const dxTop = (x - topEllipseCenterX) / (ellipseRadiusX + tolerance);
            const dyTop = (y - topEllipseCenterY) / (ellipseRadiusY + tolerance);
            if (dxTop * dxTop + dyTop * dyTop <= 1) return true;

            const bottomEllipseCenterX = cylX + cylWidth / 2;
            const bottomEllipseCenterY = cylY + cylHeight - ellipseRadiusY;
            const dxBottom = (x - bottomEllipseCenterX) / (ellipseRadiusX + tolerance);
            const dyBottom = (y - bottomEllipseCenterY) / (ellipseRadiusY + tolerance);
            if (dxBottom * dxBottom + dyBottom * dyBottom <= 1) return true;

            const minX = Math.min(cylX, cylX + cylWidth) - tolerance;
            const maxX = Math.max(cylX, cylX + cylWidth) + tolerance;
            const minY = Math.min(cylY + ellipseRadiusY, cylY + cylHeight - ellipseRadiusY) - tolerance;
            const maxY = Math.max(cylY + ellipseRadiusY, cylY + cylHeight - ellipseRadiusY) + tolerance;
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        } else if (element.type === 'cloud') {
            const minX = Math.min(ex, ex + width) - tolerance;
            const maxX = Math.max(ex, ex + width) + tolerance;
            const minY = Math.min(ey, ey + height) - tolerance;
            const maxY = Math.max(ey, ey + height) + tolerance;
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        }
        return false;
    },

    getDistanceToSegment(px, py, x1, y1, x2, y2) {
        const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (l2 === 0) return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t));
        const nearestX = x1 + t * (x2 - x1);
        const nearestY = y1 + t * (y2 - y1);
        return Math.sqrt((px - nearestX) * (px - nearestX) + (py - nearestY) * (py - nearestY));
    },

    // Ray casting, used for the triangle hit test
    isPointInPolygon(px, py, points) {
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const [xi, yi] = points[i];
            const [xj, yj] = points[j];
            const crosses = (yi > py) !== (yj > py);
            if (crosses && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
        }
        return inside;
    },

    // Rectangle around an element in world coordinates (the pen stores its points, not a box)
    getElementBounds(element) {
        if (element.type === 'pen' && Array.isArray(element.path) && element.path.length) {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            for (const point of element.path) {
                minX = Math.min(minX, point.x);
                minY = Math.min(minY, point.y);
                maxX = Math.max(maxX, point.x);
                maxY = Math.max(maxY, point.y);
            }
            const pad = (element.strokeWidth || 1) / 2;
            return {
                x: minX - pad,
                y: minY - pad,
                width: (maxX - minX) + pad * 2,
                height: (maxY - minY) + pad * 2
            };
        }
        return {
            x: Math.min(element.x, element.x + element.width),
            y: Math.min(element.y, element.y + element.height),
            width: Math.abs(element.width),
            height: Math.abs(element.height)
        };
    },

    getContentBounds() {
        if (!this.elements.length) return null;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const element of this.elements) {
            const b = this.getElementBounds(element);
            minX = Math.min(minX, b.x);
            minY = Math.min(minY, b.y);
            maxX = Math.max(maxX, b.x + b.width);
            maxY = Math.max(maxY, b.y + b.height);
        }
        if (!isFinite(minX)) return null;
        return { x: minX, y: minY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) };
    },

    getHandleAt(x, y, element) {
        if (!element || element.type === 'pen') return null;
        const { x: elX, y: elY, width: elW, height: elH } = element;
        const handles = {
            tl: { x: elX, y: elY },
            tm: { x: elX + elW / 2, y: elY },
            tr: { x: elX + elW, y: elY },
            ml: { x: elX, y: elY + elH / 2 },
            mr: { x: elX + elW, y: elY + elH / 2 },
            bl: { x: elX, y: elY + elH },
            bm: { x: elX + elW / 2, y: elY + elH },
            br: { x: elX + elW, y: elY + elH }
        };
        // The grab area is constant on screen, so handles stay reachable when zoomed out
        const reach = (HANDLE_SIZE + HANDLE_GRAB_PADDING) / this.zoomLevel;
        for (const key in handles) {
            const handle = handles[key];
            if (Math.abs(x - handle.x) <= reach && Math.abs(y - handle.y) <= reach) {
                return key;
            }
        }
        return null;
    },

    normalizeElement(element) {
        if (!element || element.type === 'pen' || element.type === 'line' || element.type === 'arrow') {
            return;
        }
        if (element.width < 0) {
            element.x += element.width;
            element.width = Math.abs(element.width);
        }
        if (element.height < 0) {
            element.y += element.height;
            element.height = Math.abs(element.height);
        }
    }
});
