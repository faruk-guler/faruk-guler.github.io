/* OpenDraw WebUI v.3.1 - PNG / JPG / SVG / PDF / JSON export, project import, image placement
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
Object.assign(DrawingApp.prototype, {
    // Export and Import
    exportDrawing(format) {
        // A format that is not one of the five choices would otherwise surface as a crash
        // message ("reading 'toUpperCase'") instead of something a user can act on.
        if (!EXPORT_FORMATS.includes(format)) {
            this.toast('Unknown export format.', 'error');
            return;
        }
        if (!this.elements.length) {
            this.toast('There is nothing to export yet.');
            return;
        }
        this.finishTextEdit();
        try {
            if (format === 'json') this.exportProject();
            else if (format === 'svg') this.exportSVG();
            else this.exportRaster(format);           // png | jpg | pdf
        } catch (error) {
            console.error('Export failed:', error);
            this.toast(`Export failed: ${error.message}`, 'error');
        }
    },

    // Which part of the world is written to the file: the visible area, or the whole drawing
    // including the shapes that are currently scrolled out of view.
    getExportWorldRect() {
        const bounds = this.getContentBounds();
        const pad = EXPORT_PADDING / this.zoomLevel;
        if (!document.getElementById('exportWholeDrawing').checked || !bounds) {
            return {
                x: -this.offsetX / this.zoomLevel,
                y: -this.offsetY / this.zoomLevel,
                width: this.viewWidth / this.zoomLevel,
                height: this.viewHeight / this.zoomLevel,
                scale: this.dpr * this.zoomLevel,
                pixelWidth: this.viewWidth,
                pixelHeight: this.viewHeight
            };
        }
        return {
            x: bounds.x - pad,
            y: bounds.y - pad,
            width: bounds.width + pad * 2,
            height: bounds.height + pad * 2,
            scale: this.dpr,
            pixelWidth: bounds.width + pad * 2,
            pixelHeight: bounds.height + pad * 2
        };
    },

    canvasBackground() {
        const configured = getComputedStyle(document.body).getPropertyValue('--canvas-bg').trim();
        return configured || (this.isDarkMode ? THEME_DEFAULTS.dark.canvas : THEME_DEFAULTS.light.canvas);
    },

    exportRaster(format) {
        const rect = this.getExportWorldRect();
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(rect.width * rect.scale));
        canvas.height = Math.max(1, Math.round(rect.height * rect.scale));
        const ctx = canvas.getContext('2d');

        // Exports carry the canvas background: strokes are read against it on screen, and
        // JPG/PDF have no transparency, so a black page was produced before.
        ctx.fillStyle = this.canvasBackground();
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.setTransform(rect.scale, 0, 0, rect.scale, 0, 0);
        ctx.translate(-rect.x, -rect.y);

        const surface = rough.canvas(canvas);
        for (const element of this.elements) this.drawElementTo(element, ctx, surface);

        if (format === 'pdf') {
            // JPEG rather than PNG: jsPDF embeds a PNG as raw pixel data (a 790x495 page came
            // out at 1.5 MB), while a JPEG stream is inserted as it is - same page, ~60 KB.
            this.exportPDF(canvas.toDataURL('image/jpeg', 0.92), canvas.width, canvas.height, 'JPEG');
            return;
        }
        const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
        this.download(canvas.toDataURL(mime, format === 'jpg' ? 0.92 : 1.0), `drawing.${format}`);
        this.toast(`${format.toUpperCase()} exported.`);
    },

    exportPDF(dataUrl, width, height, imageFormat = 'PNG') {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            this.toast('The PDF library is unavailable - export a PNG instead.', 'error');
            return;
        }
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: width >= height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [width, height]
        });
        // jsPDF reorders the format to match the orientation, so the image is fitted into
        // whichever page size it ended up with instead of assuming it equals the canvas.
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / width, pageHeight / height);
        const drawWidth = width * ratio;
        const drawHeight = height * ratio;
        pdf.addImage(dataUrl, imageFormat, (pageWidth - drawWidth) / 2, (pageHeight - drawHeight) / 2, drawWidth, drawHeight);
        pdf.save('drawing.pdf');
        this.toast('PDF exported.');
    },

    exportSVG() {
        const rect = this.getExportWorldRect();
        const root = document.createElementNS(SVG_NS, 'svg');
        root.setAttribute('xmlns', SVG_NS);
        root.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        root.setAttribute('width', Math.round(rect.pixelWidth));
        root.setAttribute('height', Math.round(rect.pixelHeight));
        root.setAttribute('viewBox', `${round(rect.x)} ${round(rect.y)} ${round(rect.width)} ${round(rect.height)}`);

        const background = document.createElementNS(SVG_NS, 'rect');
        background.setAttribute('x', round(rect.x));
        background.setAttribute('y', round(rect.y));
        background.setAttribute('width', round(rect.width));
        background.setAttribute('height', round(rect.height));
        background.setAttribute('fill', this.canvasBackground());
        root.appendChild(background);

        // Rough.js needs a host element to read ownerDocument from; a detached svg root is
        // enough and the generated groups are collected from the return value.
        const surface = rough.svg(root);
        for (const element of this.elements) {
            const node = this.createSVGNode(element, surface);
            if (node) root.appendChild(node);
        }

        const source = new XMLSerializer().serializeToString(root);
        const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${source}`], { type: 'image/svg+xml;charset=utf-8' });
        this.download(URL.createObjectURL(blob), 'drawing.svg', true);
        this.toast('SVG exported.');
    },

    createSVGNode(element, surface) {
        if (element.type === 'text') return this.createSVGText(element);

        if (element.type === 'image') {
            if (!element.src) return null;
            const bounds = this.getElementBounds(element);
            const image = document.createElementNS(SVG_NS, 'image');
            image.setAttribute('href', element.src);
            // A namespaced attribute, not one literally called "xlink:href": strict SVG
            // readers (Inkscape and friends) ignore the latter.
            image.setAttributeNS(XLINK_NS, 'xlink:href', element.src);
            image.setAttribute('x', round(bounds.x));
            image.setAttribute('y', round(bounds.y));
            image.setAttribute('width', round(bounds.width));
            image.setAttribute('height', round(bounds.height));
            image.setAttribute('preserveAspectRatio', 'none');
            return image;
        }

        const drawables = this.getCachedDrawables(element);
        if (!drawables.length) return null;
        const anchor = this.drawAnchor(element);
        const group = document.createElementNS(SVG_NS, 'g');
        group.setAttribute('transform', `translate(${round(anchor.x)} ${round(anchor.y)})`);
        for (const drawable of drawables) group.appendChild(surface.draw(drawable));
        return group;
    },

    // Text is real SVG text, so it stays selectable and searchable in the exported file
    createSVGText(element) {
        const fontSize = element.fontSize || TEXT_DEFAULT_SIZE;
        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', round(element.x));
        text.setAttribute('y', round(element.y));
        text.setAttribute('font-family', FONT_STACK);
        text.setAttribute('font-size', round(fontSize));
        text.setAttribute('fill', element.strokeColor);
        text.setAttribute('xml:space', 'preserve');
        this.textLines(element).forEach((line, index) => {
            const span = document.createElementNS(SVG_NS, 'tspan');
            span.setAttribute('x', round(element.x));
            // The first line sits below the anchor, mirroring textBaseline = "top" on canvas
            span.setAttribute('dy', index === 0 ? '0.8em' : `${TEXT_LINE_HEIGHT}em`);
            span.textContent = line;
            text.appendChild(span);
        });
        return text;
    },

    exportProject() {
        // The plain array stays compatible with projects saved by older versions
        const elements = this.elements.map(element => {
            const copy = { ...element };
            delete copy.image;            // not serialisable; .src carries the picture
            return copy;
        });
        const blob = new Blob([JSON.stringify(elements, null, 2)], { type: 'application/json' });
        this.download(URL.createObjectURL(blob), 'drawing.json', true);
        this.toast('Project exported as JSON.');
    },

    download(href, filename, revokeObjectUrl = false) {
        const link = document.createElement('a');
        link.href = href;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        if (revokeObjectUrl) setTimeout(() => URL.revokeObjectURL(href), 1000);
    },

    importDrawing(event) {
        const input = event.target;
        const file = input.files && input.files[0];
        input.value = '';                 // let the same file be chosen again right away
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (!Array.isArray(parsed)) throw new Error('the file does not contain a shape list');
                const imported = this.sanitizeElements(parsed);
                if (!imported.length) throw new Error('no readable shapes in the file');

                this.finishTextEdit();
                this.elements = imported;
                this.selectElement(null);
                this.saveState();
                this.fitToContent();      // the project may be laid out for another canvas size
                if (imported.length < parsed.length) {
                    this.toast(`${imported.length} shape(s) imported, ${parsed.length - imported.length} skipped.`, 'error');
                } else {
                    this.toast('Drawing imported.');
                }
            } catch (error) {
                console.error('Import error:', error);
                this.toast(`Import failed: ${error.message}`, 'error');
            }
        };
        reader.onerror = () => this.toast('Import failed: the file could not be read.', 'error');
        reader.readAsText(file);
    },

    addImage(event) {
        const input = event.target;
        const file = input.files && input.files[0];
        input.value = '';                 // let the same file be picked again
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.toast('That file is not an image.', 'error');
            return;
        }
        // A picture is embedded as a data URL in every undo snapshot and in the autosave
        if (file.size > 8 * 1024 * 1024) {
            this.toast('That image is larger than 8 MB - please shrink it first.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.onload = () => {
                const centerX = (this.viewWidth / 2 - this.offsetX) / this.zoomLevel;
                const centerY = (this.viewHeight / 2 - this.offsetY) / this.zoomLevel;
                const defaultWidth = 100 / this.zoomLevel;   // same on-screen size at any zoom
                const defaultHeight = image.naturalWidth
                    ? (image.naturalHeight / image.naturalWidth) * defaultWidth
                    : defaultWidth;

                const element = this.createElement('image',
                    centerX - defaultWidth / 2, centerY - defaultHeight / 2,
                    centerX + defaultWidth / 2, centerY + defaultHeight / 2);
                element.src = e.target.result;
                element.image = image;

                this.elements.push(element);
                this.selectElement(element);
                this.saveState();
                this.redraw();
                this.toast('Image added to the canvas.');
            };
            image.onerror = () => this.toast('The image could not be decoded.', 'error');
            image.src = e.target.result;
        };
        reader.onerror = () => this.toast('The image file could not be read.', 'error');
        reader.readAsDataURL(file);
    }
});
