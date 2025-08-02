class DrawingApp {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.elements = [];
        this.history = [];
        this.historyIndex = -1;
        this.currentTool = 'select';
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.currentElement = null;
        this.selectedElement = null;
        this.dragOffset = { x: 0, y: 0 };
        this.penPath = [];

        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.saveState();
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.redraw();
    }

    setupEventListeners() {
        // Tool buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTool = btn.dataset.tool;
                this.selectedElement = null;
                this.hidePropertiesPanel();
                this.redraw();
            });
        });

        // Canvas events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));

        // Color and stroke controls
        document.getElementById('strokeColor').addEventListener('input', (e) => {
            if (this.selectedElement) {
                this.selectedElement.strokeColor = e.target.value;
                this.redraw();
                this.saveState();
            }
        });

        document.getElementById('fillColor').addEventListener('input', (e) => {
            if (this.selectedElement) {
                this.selectedElement.fillColor = e.target.value;
                this.redraw();
                this.saveState();
            }
        });

        document.getElementById('strokeWidth').addEventListener('input', (e) => {
            if (this.selectedElement) {
                this.selectedElement.strokeWidth = parseInt(e.target.value);
                this.redraw();
                this.saveState();
            }
        });

        // Action buttons
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportDrawing());
        document.getElementById('importBtn').addEventListener('change', (e) => this.importDrawing(e));

        // Properties panel
        document.getElementById('propStrokeColor').addEventListener('input', (e) => {
            if (this.selectedElement) {
                this.selectedElement.strokeColor = e.target.value;
                this.redraw();
                this.saveState();
            }
        });

        document.getElementById('propFillColor').addEventListener('input', (e) => {
            if (this.selectedElement) {
                this.selectedElement.fillColor = e.target.value;
                this.redraw();
                this.saveState();
            }
        });

        document.getElementById('propStrokeWidth').addEventListener('input', (e) => {
            if (this.selectedElement) {
                this.selectedElement.strokeWidth = parseInt(e.target.value);
                this.redraw();
                this.saveState();
            }
        });

        document.getElementById('deleteBtn').addEventListener('click', () => {
            if (this.selectedElement) {
                this.deleteSelectedElement();
            }
        });

        // Text input
        const textInput = document.getElementById('textInput');
        textInput.addEventListener('blur', () => this.finishTextInput());
        textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.finishTextInput();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'z':
                        e.preventDefault();
                        this.undo();
                        break;
                    case 'y':
                        e.preventDefault();
                        this.redo();
                        break;
                }
            }
            if (e.key === 'Delete' && this.selectedElement) {
                this.deleteSelectedElement();
            }
        });
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleMouseDown(e) {
        const pos = this.getMousePos(e);
        this.startX = pos.x;
        this.startY = pos.y;
        this.isDrawing = true;

        if (this.currentTool === 'select') {
            this.selectedElement = this.getElementAt(pos.x, pos.y);
            if (this.selectedElement) {
                this.dragOffset.x = pos.x - this.selectedElement.x;
                this.dragOffset.y = pos.y - this.selectedElement.y;
                this.showPropertiesPanel();
            } else {
                this.hidePropertiesPanel();
            }
            this.redraw();
        } else if (this.currentTool === 'text') {
            this.startTextInput(pos.x, pos.y);
        } else if (this.currentTool === 'pen') {
            this.penPath = [{ x: pos.x, y: pos.y }];
            this.currentElement = this.createElement('pen', pos.x, pos.y, pos.x, pos.y);
        } else {
            this.currentElement = this.createElement(this.currentTool, pos.x, pos.y, pos.x, pos.y);
        }
    }

    handleMouseMove(e) {
        if (!this.isDrawing) return;

        const pos = this.getMousePos(e);

        if (this.currentTool === 'select' && this.selectedElement) {
            this.selectedElement.x = pos.x - this.dragOffset.x;
            this.selectedElement.y = pos.y - this.dragOffset.y;
            this.redraw();
        } else if (this.currentTool === 'pen' && this.currentElement) {
            this.penPath.push({ x: pos.x, y: pos.y });
            this.currentElement.path = [...this.penPath];
            this.redraw();
        } else if (this.currentElement) {
            this.currentElement.width = pos.x - this.startX;
            this.currentElement.height = pos.y - this.startY;
            this.redraw();
        }
    }

    handleMouseUp(e) {
        if (!this.isDrawing) return;
        this.isDrawing = false;

        if (this.currentElement && this.currentTool !== 'select') {
             if (Math.abs(this.currentElement.width) > 1 || Math.abs(this.currentElement.height) > 1 || this.currentTool === 'pen') {
                this.elements.push(this.currentElement);
                this.saveState();
             }
        } else if (this.currentTool === 'select' && this.selectedElement) {
            this.saveState();
        }


        this.currentElement = null;
        this.penPath = [];
    }

    handleDoubleClick(e) {
        if (this.currentTool !== 'select') return;
        const pos = this.getMousePos(e);
        const element = this.getElementAt(pos.x, pos.y);
        if (element && element.type === 'text') {
            this.startTextInput(element.x, element.y, element.text, element);
        }
    }

    createElement(type, x, y, endX, endY) {
        const strokeColor = document.getElementById('strokeColor').value;
        const fillColor = document.getElementById('fillColor').value;
        const strokeWidth = parseInt(document.getElementById('strokeWidth').value);

        const element = {
            type,
            x,
            y,
            width: endX - x,
            height: endY - y,
            strokeColor,
            fillColor,
            strokeWidth,
            id: Date.now() + Math.random()
        };

        if (type === 'pen') {
            element.path = [{x,y}];
        }

        return element;
    }

    getElementAt(x, y) {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const element = this.elements[i];
            if (this.isPointInElement(x, y, element)) {
                return element;
            }
        }
        return null;
    }

    isPointInElement(x, y, element) {
        const { type, x: ex, y: ey, width, height, strokeWidth } = element;
        const margin = strokeWidth / 2 + 5; // 5px margin

        if (type === 'rectangle' || type === 'text') {
            const minX = Math.min(ex, ex + width) - margin;
            const maxX = Math.max(ex, ex + width) + margin;
            const minY = Math.min(ey, ey + height) - margin;
            const maxY = Math.max(ey, ey + height) + margin;
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        } else if (type === 'circle') {
            const centerX = ex + width / 2;
            const centerY = ey + height / 2;
            const radiusX = Math.abs(width) / 2 + margin;
            const radiusY = Math.abs(height) / 2 + margin;
            const dx = (x - centerX) / radiusX;
            const dy = (y - centerY) / radiusY;
            return dx * dx + dy * dy <= 1;
        } else if (type === 'line') {
             const dist = Math.abs((height) * x - (width) * y + width * ey - height * ex) / Math.sqrt(height * height + width * width);
             return dist <= margin;
        } else if (type === 'pen') {
            return element.path.some((p, i) => {
                if (i === 0) return false;
                const p1 = element.path[i - 1];
                const p2 = p;
                const dist = Math.abs((p2.y - p1.y) * x - (p2.x - p1.x) * y + p2.x * p1.y - p2.y * p1.x) / Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
                return dist <= margin;
            });
        }
        return false;
    }

    startTextInput(x, y, initialText = '', editingElement = null) {
        const textInput = document.getElementById('textInput');
        textInput.style.display = 'block';
        textInput.style.left = x + 'px';
        textInput.style.top = y + 'px';
        textInput.value = initialText;
        textInput.focus();
        this.textInputPos = { x, y };
        this.editingTextElement = editingElement;
    }

    finishTextInput() {
        const textInput = document.getElementById('textInput');
        const text = textInput.value.trim();

        if (this.editingTextElement) {
            if (text) {
                this.editingTextElement.text = text;
            } else {
                this.elements = this.elements.filter(el => el.id !== this.editingTextElement.id);
            }
        } else {
            if (text) {
                const element = this.createElement('text', this.textInputPos.x, this.textInputPos.y, 0, 0);
                element.text = text;
                this.ctx.font = '16px Arial';
                const textMetrics = this.ctx.measureText(text);
                element.width = textMetrics.width;
                element.height = 16;
                this.elements.push(element);
            }
        }

        this.saveState();
        this.redraw();
        textInput.style.display = 'none';
        this.editingTextElement = null;
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.elements.forEach(element => this.drawElement(element));
        if (this.currentElement) {
            this.drawElement(this.currentElement);
        }
        if (this.selectedElement) {
            this.drawSelection(this.selectedElement);
        }
    }

    drawElement(element) {
        this.ctx.strokeStyle = element.strokeColor;
        this.ctx.fillStyle = element.fillColor;
        this.ctx.lineWidth = element.strokeWidth;

        switch (element.type) {
            case 'rectangle':
                this.ctx.beginPath();
                this.ctx.rect(element.x, element.y, element.width, element.height);
                if (element.fillColor !== '#ffffff') this.ctx.fill();
                this.ctx.stroke();
                break;
            case 'circle':
                this.ctx.beginPath();
                this.ctx.ellipse(element.x + element.width / 2, element.y + element.height / 2, Math.abs(element.width / 2), Math.abs(element.height / 2), 0, 0, 2 * Math.PI);
                if (element.fillColor !== '#ffffff') this.ctx.fill();
                this.ctx.stroke();
                break;
            case 'line':
                this.ctx.beginPath();
                this.ctx.moveTo(element.x, element.y);
                this.ctx.lineTo(element.x + element.width, element.y + element.height);
                this.ctx.stroke();
                break;
            case 'pen':
                if (!element.path || element.path.length < 2) return;
                this.ctx.beginPath();
                this.ctx.moveTo(element.path[0].x, element.path[0].y);
                for (let i = 1; i < element.path.length; i++) {
                    this.ctx.lineTo(element.path[i].x, element.path[i].y);
                }
                this.ctx.stroke();
                break;
            case 'text':
                this.ctx.font = '16px Arial';
                this.ctx.fillStyle = element.strokeColor;
                this.ctx.fillText(element.text, element.x, element.y + 16);
                break;
        }
    }

    drawSelection(element) {
        this.ctx.strokeStyle = '#3b82f6';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        const bounds = this.getElementBounds(element);
        this.ctx.strokeRect(bounds.x - 5, bounds.y - 5, bounds.width + 10, bounds.height + 10);
        this.ctx.setLineDash([]);
    }

    getElementBounds(element) {
        if (element.type === 'pen') {
            return this.getPenBounds(element);
        }
         if (element.type === 'text') {
            this.ctx.font = '16px Arial';
            const metrics = this.ctx.measureText(element.text);
            return {
                x: element.x,
                y: element.y,
                width: metrics.width,
                height: 16
            };
        }
        return {
            x: Math.min(element.x, element.x + element.width),
            y: Math.min(element.y, element.y + element.height),
            width: Math.abs(element.width),
            height: Math.abs(element.height)
        };
    }

    getPenBounds(element) {
        if (!element.path || element.path.length === 0) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        element.path.forEach(p => {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        });
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    }

    showPropertiesPanel() {
        const panel = document.getElementById('propertiesPanel');
        if (!this.selectedElement) {
            panel.style.display = 'none';
            return;
        }
        panel.style.display = 'block';
        document.getElementById('propStrokeColor').value = this.selectedElement.strokeColor;
        document.getElementById('propFillColor').value = this.selectedElement.fillColor;
        document.getElementById('propStrokeWidth').value = this.selectedElement.strokeWidth;
    }

    hidePropertiesPanel() {
        document.getElementById('propertiesPanel').style.display = 'none';
    }

    deleteSelectedElement() {
        if (!this.selectedElement) return;
        this.elements = this.elements.filter(el => el.id !== this.selectedElement.id);
        this.selectedElement = null;
        this.hidePropertiesPanel();
        this.saveState();
        this.redraw();
    }

    saveState() {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(JSON.stringify(this.elements));
        this.historyIndex++;
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.elements = JSON.parse(this.history[this.historyIndex]);
            this.redraw();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.elements = JSON.parse(this.history[this.historyIndex]);
            this.redraw();
        }
    }

    clear() {
        if (confirm('Are you sure you want to clear the canvas?')) {
            this.elements = [];
            this.history = [];
            this.historyIndex = -1;
            this.saveState();
            this.redraw();
        }
    }

    exportDrawing() {
        const dataStr = JSON.stringify(this.elements);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'drawing.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importDrawing(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const newElements = JSON.parse(event.target.result);
                if (Array.isArray(newElements)) {
                    this.elements = newElements;
                    this.saveState();
                    this.redraw();
                } else {
                    alert('Invalid file format.');
                }
            } catch (error) {
                alert('Error reading file.');
                console.error(error);
            }
        };
        reader.readAsText(file);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DrawingApp();
});
