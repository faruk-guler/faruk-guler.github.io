/* OpenDraw WebUI v.3.1 - painting: redraw scheduling, Rough.js drawable cache, selection outline
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
Object.assign(DrawingApp.prototype, {
    // Redraws are coalesced into a single animation frame, so a burst of pointermove events
    // causes exactly one repaint instead of one full Rough.js re-render each.
    scheduleRedraw() {
        if (this.redrawQueued) return;
        this.redrawQueued = true;
        requestAnimationFrame(() => {
            this.redrawQueued = false;
            this.redraw();
        });
    },

    redraw() {
        const ctx = this.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // CSS pixels are the drawing unit: the ratio restores sharpness on HiDPI screens
        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        ctx.translate(this.offsetX, this.offsetY);
        ctx.scale(this.zoomLevel, this.zoomLevel);

        for (const element of this.elements) {
            // The label being typed is shown by the editing overlay, not drawn twice
            if (element === this.editingElement) continue;
            this.drawElementTo(element, ctx, this.rc);
        }

        if (this.currentElement && this.activeTool !== 'select') {
            this.drawElementTo(this.currentElement, ctx, this.rc);
        }

        if (this.selectedElement && this.selectedElement !== this.editingElement) {
            this.drawSelectionOutline(this.selectedElement);
        }

        this.syncTextEditOverlay();
    },

    // Where the shape geometry is anchored: a box dragged against the axis order is flipped
    // here so the shape itself can always be generated with positive size.
    drawAnchor(element) {
        if (element.type === 'line' || element.type === 'arrow' || element.type === 'pen') {
            return { x: element.x, y: element.y };
        }
        return {
            x: Math.min(element.x, element.x + element.width),
            y: Math.min(element.y, element.y + element.height)
        };
    },

    invalidateDrawable(element) {
        this.drawableCache.delete(element.id);
    },

    // Everything that changes the generated sketch, except the position: shapes are generated
    // in local coordinates, so moving one reuses its drawables instead of re-rolling the
    // randomness - which used to make the whole drawing shimmer on every redraw.
    drawableSignature(element) {
        const geometry = this.shapeSize(element);
        const parts = [
            element.type, geometry.width, geometry.height,
            element.strokeColor, element.fillColor, element.strokeWidth,
            element.roughness, element.arrowheadSize, element.text
        ];
        if (element.type === 'arrow') {
            // the head length is derived from the stroke width and shaft length
            parts.push(this.arrowHeadSize(element));
        }
        if (Array.isArray(element.path)) {
            parts.push(element.path.length);
            const step = Math.max(1, Math.floor(element.path.length / 16));
            for (let i = 0; i < element.path.length; i += step) {
                parts.push(Math.round(element.path[i].x - element.x), Math.round(element.path[i].y - element.y));
            }
        }
        return parts.join('~');
    },

    // Effective head length: explicit sizes from a project win, the legacy fixed value of 10
    // is ignored so previously saved arrows also get the larger head.
    arrowHeadSize(element) {
        const length = Math.hypot(element.width, element.height) || 1;
        const stored = element.arrowheadSize;
        const wanted = (stored && stored !== LEGACY_ARROW_HEAD)
            ? stored
            : ARROW_HEAD_BASE + (element.strokeWidth || 1) * ARROW_HEAD_PER_STROKE;
        return Math.max(8, Math.min(wanted, length * ARROW_HEAD_MAX_RATIO));
    },

    shapeSize(element) {
        if (element.type === 'line' || element.type === 'arrow' || element.type === 'pen') {
            return { width: element.width, height: element.height };
        }
        return { width: Math.abs(element.width), height: Math.abs(element.height) };
    },

    getCachedDrawables(element) {
        const signature = this.drawableSignature(element);
        const cached = this.drawableCache.get(element.id);
        if (cached && cached.signature === signature) return cached.drawables;
        const drawables = this.generateDrawables(element);
        this.drawableCache.set(element.id, { signature, drawables });
        return drawables;
    },

    roughOptionsFor(element) {
        const options = {
            stroke: element.strokeColor,
            strokeWidth: element.strokeWidth,
            roughness: element.roughness === undefined ? this.roughness : element.roughness
        };
        // Rough.js only fills when a fill colour is present, so "transparent" must stay unset
        // rather than being passed as the (invalid) colour "none".
        if (element.fillColor && element.fillColor !== 'transparent' && element.type !== 'text') {
            options.fill = element.fillColor;
            // White keeps the classic hatched look, any other colour is painted solid. Compared
            // case-insensitively: projects can carry "#FFFFFF" and must look the same.
            options.fillStyle = String(element.fillColor).toLowerCase() === '#ffffff' ? 'hachure' : 'solid';
        }
        return options;
    },

    // Shapes are generated around the local origin; drawElementTo() translates them into place.
    generateDrawables(element) {
        const { width, height } = this.shapeSize(element);
        const options = this.roughOptionsFor(element);
        const generator = rough.generator();
        const drawables = [];

        switch (element.type) {
            case 'rectangle':
                drawables.push(generator.rectangle(0, 0, width, height, options));
                break;
            case 'circle':
                drawables.push(generator.ellipse(width / 2, height / 2, width, height, options));
                break;
            case 'line':
                drawables.push(generator.line(0, 0, element.width, element.height, options));
                break;
            case 'triangle':
                drawables.push(generator.polygon([[width / 2, 0], [0, height], [width, height]], options));
                break;
            case 'cylinder': {
                const radiusY = Math.abs(height) / 8;
                const topY = radiusY;
                const bottomY = height - radiusY;
                const arcOptions = { ...options };
                delete arcOptions.fill;
                delete arcOptions.fillStyle;

                drawables.push(generator.line(0, topY, 0, bottomY, options));
                drawables.push(generator.line(width, topY, width, bottomY, options));
                // The bottom is a whole ellipse too, not just the front arc: a single arc made the
                // cylinder read as a tube that is open at the bottom. It stays unfilled, because a
                // fill here would be painted over the two side lines it belongs behind.
                drawables.push(generator.ellipse(width / 2, bottomY, width, radiusY * 2, arcOptions));
                // The top ellipse is filled and therefore covers the back of the lines
                drawables.push(generator.ellipse(width / 2, topY, width, radiusY * 2, options));
                break;
            }
            case 'cloud': {
                const cloudPath = `M ${width * 0.2} ${height * 0.7} C ${-width * 0.1} ${height * 0.9}, ${width * 0.1} ${height * 0.3}, ${width * 0.4} ${height * 0.2} C ${width * 0.8} ${-height * 0.1}, ${width * 1.1} ${height * 0.2}, ${width * 0.9} ${height * 0.5} C ${width * 1.2} ${height * 0.8}, ${width * 0.8} ${height * 1.1}, ${width * 0.5} ${height * 0.9} C ${width * 0.2} ${height * 1.1}, ${width * 0.0} ${height * 0.9}, ${width * 0.2} ${height * 0.7} Z`;
                drawables.push(generator.path(cloudPath, options));
                break;
            }
            case 'arrow': {
                const angle = Math.atan2(element.height, element.width);
                const size = this.arrowHeadSize(element);
                const tipX = element.width;
                const tipY = element.height;
                // The head is always painted in the pen colour: inheriting the shape fill made
                // it a white hatched blob instead of a readable arrow tip.
                const headOptions = { ...options, fill: element.strokeColor, fillStyle: 'solid' };
                drawables.push(generator.line(0, 0, tipX, tipY, options));
                drawables.push(generator.polygon([
                    [tipX - size * Math.cos(angle - ARROW_HEAD_ANGLE), tipY - size * Math.sin(angle - ARROW_HEAD_ANGLE)],
                    [tipX, tipY],
                    [tipX - size * Math.cos(angle + ARROW_HEAD_ANGLE), tipY - size * Math.sin(angle + ARROW_HEAD_ANGLE)]
                ], headOptions));
                break;
            }
            case 'pen': {
                if (Array.isArray(element.path) && element.path.length > 1) {
                    // Points are stored absolutely; the anchor is the element position
                    const points = element.path.map(p => [p.x - element.x, p.y - element.y]);
                    const penOptions = { ...options };
                    delete penOptions.fill;
                    delete penOptions.fillStyle;
                    drawables.push(generator.linearPath(points, penOptions));
                }
                break;
            }
        }
        return drawables;
    },

    drawElementTo(element, ctx, rc) {
        if (element.type === 'text') {
            this.drawTextElement(element, ctx);
            return;
        }
        if (element.type === 'image') {
            this.drawImageElement(element, ctx);
            return;
        }
        const drawables = this.getCachedDrawables(element);
        if (!drawables.length) return;

        const anchor = this.drawAnchor(element);
        ctx.save();
        ctx.translate(anchor.x, anchor.y);
        for (const drawable of drawables) rc.draw(drawable);
        ctx.restore();
    },

    drawTextElement(element, ctx) {
        const fontSize = element.fontSize || TEXT_DEFAULT_SIZE;
        ctx.save();
        ctx.font = `${fontSize}px ${FONT_STACK}`;
        ctx.fillStyle = element.strokeColor;   // the label colour is the stroke colour
        ctx.textBaseline = 'top';
        this.textLines(element).forEach((line, index) => {
            ctx.fillText(line, element.x, element.y + index * fontSize * TEXT_LINE_HEIGHT);
        });
        ctx.restore();
    },

    drawImageElement(element, ctx) {
        const bounds = this.getElementBounds(element);
        const image = element.image;
        if (image && image.complete && image.naturalWidth !== 0) {
            ctx.drawImage(image, bounds.x, bounds.y, bounds.width, bounds.height);
            return;
        }
        if (!element.src) return;

        // Decode once per element; the completion triggers a single repaint
        if (this.pendingImageLoads.has(element.id)) return;
        this.pendingImageLoads.add(element.id);
        const loaded = new Image();
        loaded.onload = () => { this.pendingImageLoads.delete(element.id); element.image = loaded; this.scheduleRedraw(); };
        loaded.onerror = () => { this.pendingImageLoads.delete(element.id); };
        loaded.src = element.src;
    },

    drawSelectionOutline(element) {
        const ctx = this.ctx;
        // Handles are placed on the raw corners so they line up with getHandleAt(); a line
        // dragged to the left simply has a negative width and strokeRect handles that fine.
        const box = element.type === 'pen'
            ? this.getElementBounds(element)
            : { x: element.x, y: element.y, width: element.width, height: element.height };

        ctx.save();
        ctx.strokeStyle = SELECTION_COLOR;
        ctx.lineWidth = 2 / this.zoomLevel;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        ctx.setLineDash([]);

        if (element.type !== 'pen') {
            const handleSize = HANDLE_SIZE / this.zoomLevel;
            const half = handleSize / 2;
            ctx.fillStyle = SELECTION_COLOR;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1 / this.zoomLevel;

            const xs = [box.x, box.x + box.width / 2, box.x + box.width];
            const ys = [box.y, box.y + box.height / 2, box.y + box.height];
            for (const hx of xs) {
                for (const hy of ys) {
                    ctx.beginPath();
                    ctx.rect(hx - half, hy - half, handleSize, handleSize);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }
});
