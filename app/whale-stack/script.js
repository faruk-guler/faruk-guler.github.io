// WhaleStack - Professional Asset Tracker System
// Optimized for Standalone Performance

// --- DATA MODULE ---
const data = {
    portfolio: [],
    fileHandle: null,
    lastFileTimestamp: 0,
    isSaving: false,
    isUpdating: false,
    DB_NAME: "WhaleStackDB",
    DB_VERSION: 1,

    setPortfolio(newPortfolio) { this.portfolio = newPortfolio; },
    setFileHandle(handle) { this.fileHandle = handle; },
    setIsUpdating(val) { this.isUpdating = val; },

    async getHandle() {
        return new Promise(r => {
            const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            req.onupgradeneeded = e => {
                if (!e.target.result.objectStoreNames.contains("handles")) {
                    e.target.result.createObjectStore("handles");
                }
            };
            req.onsuccess = e => {
                const tx = e.target.result.transaction("handles", "readonly");
                const store = tx.objectStore("handles");
                const get = store.get("lastFile");
                get.onsuccess = () => r(get.result);
                get.onerror = () => r(null);
            };
            req.onerror = () => r(null);
        });
    },

    async setHandle(handle) {
        return new Promise((r, j) => {
            const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            req.onupgradeneeded = e => {
                if (!e.target.result.objectStoreNames.contains("handles")) {
                    e.target.result.createObjectStore("handles");
                }
            };
            req.onsuccess = e => {
                const tx = e.target.result.transaction("handles", "readwrite");
                const store = tx.objectStore("handles");
                store.put(handle, "lastFile");
                tx.oncomplete = () => r();
                tx.onerror = () => j();
            };
            req.onerror = () => j();
        });
    },

    formatDate(d) {
        return d.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    },

    async savePortfolio() {
        if (!this.fileHandle) return;
        try {
            this.isSaving = true;
            const timestamp = this.formatDate(new Date());
            const dbData = {
                lastUpdated: timestamp,
                assets: this.portfolio
            };

            const w = await this.fileHandle.createWritable();
            await w.write(JSON.stringify(dbData, null, 2));
            await w.close();
            return timestamp;
        } catch (e) {
            console.error("Save Failed", e);
            throw e;
        } finally {
            setTimeout(() => { this.isSaving = false; }, 500);
        }
    },

    async checkForExternalChanges() {
        if (!this.fileHandle || this.isSaving || this.isUpdating) return null;
        try {
            const file = await this.fileHandle.getFile();
            if (file.lastModified > this.lastFileTimestamp) {
                console.log("External change detected, reloading...");
                const text = await file.text();
                const dbContents = JSON.parse(text);
                let newPortfolio = [];
                let lastUpdate = null;

                if (Array.isArray(dbContents)) {
                    newPortfolio = dbContents;
                } else if (dbContents.assets) {
                    newPortfolio = dbContents.assets;
                    lastUpdate = dbContents.lastUpdated;
                }

                this.portfolio = newPortfolio;
                this.lastFileTimestamp = file.lastModified;
                return { portfolio: this.portfolio, lastUpdate };
            }
        } catch (e) {
            console.error("External check failed", e);
        }
        return null;
    },

    updateField(id, field, value) {
        const item = this.portfolio.find(p => p.id === id);
        if (item) {
            item[field] = (field === 'amount' || field === 'cost') ? parseFloat(value) || 0 : value;
            item.lastEdit = this.formatDate(new Date());
            return true;
        }
        return false;
    },

    deleteAsset(id) {
        const originalLength = this.portfolio.length;
        this.portfolio = this.portfolio.filter(p => p.id !== id);
        return this.portfolio.length !== originalLength;
    },

    cycleRisk(id) {
        const item = this.portfolio.find(p => p.id === id);
        if (!item) return null;

        const levels = ['Low', 'Mid', 'High'];
        let currentIndex = levels.indexOf(item.risk || 'Low');
        let nextIndex = (currentIndex + 1) % levels.length;

        item.risk = levels[nextIndex];
        item.lastEdit = this.formatDate(new Date());
        return item.risk;
    },

    addOrUpdateAsset(assetData) {
        const { id, category, amount, cost, circulatingSupply, maxSupply, risk } = assetData;
        const exist = this.portfolio.find(p => p.id === id);

        if (exist) {
            const total = (parseFloat(exist.amount) || 0) + amount;
            const oldTotalVal = (parseFloat(exist.amount) || 0) * (parseFloat(exist.cost) || 0);
            const newEntryVal = amount * cost;

            exist.cost = total > 0 ? (oldTotalVal + newEntryVal) / total : cost;
            exist.amount = total;
            exist.category = category;
            exist.circulatingSupply = circulatingSupply || exist.circulatingSupply;
            exist.maxSupply = maxSupply || exist.maxSupply;
            exist.risk = risk;
            exist.lastEdit = this.formatDate(new Date());
        } else {
            this.portfolio.push({
                id, amount, cost, category,
                circulatingSupply: circulatingSupply || "∞",
                maxSupply: maxSupply || "∞",
                risk,
                lastEdit: this.formatDate(new Date())
            });
        }
    }
};

// --- UI MODULE ---
const ui = {
    elements: {
        get assetModal() { return document.getElementById('asset-modal'); },
        get addAssetBtn() { return document.getElementById('add-asset-btn'); },
        get aboutNavBtn() { return document.getElementById('about-nav'); },
        get dashboardNavBtn() { return document.getElementById('dashboard-nav'); },
        get closeModalBtn() { return document.getElementById('close-modal'); },
        get addAssetForm() { return document.getElementById('add-asset-form'); },
        get assetsBody() { return document.getElementById('assets-body'); },
        get dashboardView() { return document.getElementById('dashboard-view'); },
        get portfolioNavBtn() { return document.getElementById('portfolio-nav'); },
        get portfolioView() { return document.getElementById('portfolio-view'); },
        get totalBalanceEl() { return document.getElementById('total-balance'); },
        get totalChangeEl() { return document.getElementById('total-change'); },
        get dbStatusEl() { return document.getElementById('db-status'); },
        get dbMgrStatusEl() { return document.getElementById('db-manager-status'); },
        get activeFileEl() { return document.getElementById('active-filename'); },
        get dbNavBtn() { return document.getElementById('db-nav'); },
        get dbView() { return document.getElementById('db-view'); },
        get aboutModal() { return document.getElementById('about-modal'); },
        get closeAboutBtn() { return document.getElementById('close-about-btn'); },
        get dbMgrFileRow() { return document.getElementById('db-mgr-file-row'); },
        get dbMgrFileNameEl() { return document.getElementById('db-mgr-filename'); },
        get lastUpdatedContainer() { return document.getElementById('last-updated-container'); },
        get globalLastUpdatedEl() { return document.getElementById('global-last-updated'); },
        get editModeBtn() { return document.getElementById('edit-mode-btn'); },
        get editControls() { return document.getElementById('edit-controls'); },
        get allocationList() { return document.getElementById('allocation-list'); },
        get balanceChart() { return document.getElementById('balanceChart'); }
    },

    balanceChartInstance: null,

    showView(viewName) {
        const views = {
            'dashboard': { el: this.elements.dashboardView, nav: this.elements.dashboardNavBtn },
            'portfolio': { el: this.elements.portfolioView, nav: this.elements.portfolioNavBtn },
            'database': { el: this.elements.dbView, nav: this.elements.dbNavBtn }
        };

        Object.values(views).forEach(v => {
            if (v.el) v.el.style.display = 'none';
            if (v.nav) v.nav.classList.remove('active');
        });

        const active = views[viewName];
        if (active && active.el && active.nav) {
            active.el.style.display = (viewName === 'dashboard' || viewName === 'database') ? 'flex' : 'block';
            active.nav.classList.add('active');
        }
    },

    updateStatusUI(isConnected, fileName, lastUpdated) {
        const statusText = isConnected ? "Connected" : "No DB Connected";
        const statusClass = isConnected ? "status-badge connect" : "status-badge disconnect";

        const { dbStatusEl, dbMgrStatusEl, activeFileEl, dbMgrFileRow, dbMgrFileNameEl, lastUpdatedContainer, globalLastUpdatedEl } = this.elements;

        if (dbStatusEl) {
            dbStatusEl.textContent = statusText;
            dbStatusEl.className = statusClass;
        }

        if (dbMgrStatusEl) {
            dbMgrStatusEl.textContent = statusText;
            dbMgrStatusEl.className = statusClass;
        }

        if (isConnected && fileName) {
            if (activeFileEl) {
                activeFileEl.style.display = 'block';
                activeFileEl.querySelector('.file-label').textContent = fileName;
            }
            if (dbMgrFileRow) {
                dbMgrFileRow.style.display = 'flex';
                dbMgrFileNameEl.textContent = fileName;
            }
        }

        if (lastUpdated && globalLastUpdatedEl) {
            lastUpdatedContainer.style.display = 'block';
            globalLastUpdatedEl.textContent = lastUpdated;
        }
    },

    renderPortfolio(portfolio, isEditMode) {
        const { assetsBody, totalBalanceEl, totalChangeEl } = this.elements;

        if (!assetsBody) return;

        if (!portfolio || portfolio.length === 0) {
            assetsBody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:40px; color:var(--text-muted)">Connect .json file to begin monitoring.</td></tr>';
            return 0;
        }

        let totalVal = 0;
        let rows = '';
        const chartLabels = [];
        const chartValues = [];

        const sortedPortfolio = [...portfolio].sort((a, b) => {
            const valA = (parseFloat(a.amount) || 0) * (parseFloat(a.cost) || 0);
            const valB = (parseFloat(b.amount) || 0) * (parseFloat(b.cost) || 0);
            return valB - valA;
        });

        sortedPortfolio.forEach(p => {
            const amount = parseFloat(p.amount) || 0;
            const cost = parseFloat(p.cost) || 0;
            const val = cost * amount;
            totalVal += val;

            chartLabels.push(p.id.toUpperCase());
            chartValues.push(val);

            const editable = isEditMode ? 'contenteditable="true"' : 'contenteditable="false"';
            const draggable = isEditMode ? 'draggable="true"' : 'draggable="false"';

            rows += `
                <tr ${draggable} class="portfolio-row" data-id="${p.id}">
                    <td class="drag-handle edit-only">⋮⋮</td>
                    <td ${editable} data-field="id" class="editable-cell" style="font-weight:800; border-right: 1px solid var(--border);">
                        ${p.id.toUpperCase()}
                    </td>
                    <td ${editable} data-field="category" class="editable-cell">
                        ${p.category || ""}
                    </td>
                    <td ${editable} data-field="amount" class="editable-cell" style="font-family: monospace; font-weight: 700;">
                        ${amount}
                    </td>
                    <td ${editable} data-field="cost" class="editable-cell" style="font-family: monospace; font-weight: 700;">
                        ${cost.toFixed(2)}
                    </td>
                    <td ${editable} data-field="circulatingSupply" class="editable-cell" style="font-family: monospace;">
                        ${p.circulatingSupply || "∞"}
                    </td>
                    <td ${editable} data-field="maxSupply" class="editable-cell" style="font-family: monospace;">
                        ${p.maxSupply || "∞"}
                    </td>
                    <td style="text-align:center">
                        <span class="risk-badge risk-${(p.risk || 'Low').toLowerCase()}" 
                                data-action="cycle-risk"
                                style="${isEditMode ? 'cursor:pointer;' : 'cursor:default;'} user-select:none;" 
                                title="${isEditMode ? 'Click to cycle risk level' : ''}">
                            ${p.risk || 'Low'}
                        </span>
                    </td>
                    <td class="edit-only" style="text-align:center">
                        <button data-action="delete" class="delete-btn" title="Delete Asset">×</button>
                    </td>
                </tr>
            `;
        });

        assetsBody.innerHTML = rows;
        if (totalBalanceEl) totalBalanceEl.innerText = `$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        if (totalChangeEl) totalChangeEl.innerHTML = `<span class="percent" style="color:var(--text-muted); font-weight:400; font-size:0.75rem;">Local Inventory View (Cost-based Val)</span>`;

        this.updateAllocationUI(chartLabels, chartValues, totalVal);
        return totalVal;
    },

    updateAllocationUI(labels, values, total) {
        const listEl = this.elements.allocationList;
        const chartEl = this.elements.balanceChart;
        if (!listEl || !chartEl) return;

        const colors = [
            '#4e5ba6', '#00d1ff', '#ff3b5e', '#ff9f43', '#feca57',
            '#5f27cd', '#48dbfb', '#ff9ff3', '#00d09c', '#00ca96',
            '#ff4d4f', '#52c41a', '#faad14', '#fa8c16', '#ff851b'
        ];

        let html = '';
        labels.forEach((label, i) => {
            const val = values[i];
            const percent = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
            const color = colors[i % colors.length];

            html += `
                <div class="alloc-item">
                    <div class="alloc-info">
                        <span class="alloc-label">
                            <span class="alloc-dot" style="background:${color}"></span>
                            ${label}
                        </span>
                        <span class="alloc-value">$${val.toLocaleString(undefined, { minimumFractionDigits: 2 })} (${percent}%)</span>
                    </div>
                    <div class="alloc-bar-bg">
                        <div class="alloc-bar-fill" style="width:${percent}%; background:${color}"></div>
                    </div>
                </div>
            `;
        });
        listEl.innerHTML = html || '<p style="text-align:center; color:var(--text-muted); padding-top:20px;">No allocation data</p>';

        if (this.balanceChartInstance) {
            this.balanceChartInstance.destroy();
        }

        if (total > 0) {
            this.balanceChartInstance = new Chart(chartEl, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: colors.slice(0, labels.length),
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            enabled: true,
                            callbacks: {
                                label: (context) => {
                                    const val = context.raw;
                                    const pct = ((val / total) * 100).toFixed(1);
                                    return ` $${val.toLocaleString()}: ${pct}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
    },

    toggleEditModeUI(active) {
        const { editModeBtn, editControls, addAssetBtn } = this.elements;
        if (active) {
            document.body.classList.add('editing-active');
            if (editModeBtn) editModeBtn.style.display = 'none';
            if (editControls) editControls.style.display = 'flex';
            if (addAssetBtn) {
                addAssetBtn.disabled = false;
                addAssetBtn.style.opacity = '1';
                addAssetBtn.style.pointerEvents = 'auto';
            }
        } else {
            document.body.classList.remove('editing-active');
            if (editModeBtn) editModeBtn.style.display = 'block';
            if (editControls) editControls.style.display = 'none';
            if (addAssetBtn) {
                addAssetBtn.disabled = true;
                addAssetBtn.style.opacity = '0.5';
                addAssetBtn.style.pointerEvents = 'none';
            }
        }
    }
};

// --- APP LOGIC ---
let isEditMode = false;
let portfolioBackup = null;
let draggedId = null;

function initTheme() {
    const savedTheme = localStorage.getItem('whale-theme') || 'dark';
    const iconEl = document.getElementById('theme-icon');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (iconEl) iconEl.src = 'images/moon_icon.png';
    } else {
        if (iconEl) iconEl.src = 'images/sun_icon.png';
    }
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('whale-theme', isLight ? 'light' : 'dark');
    const iconEl = document.getElementById('theme-icon');
    if (iconEl) {
        iconEl.src = isLight ? 'images/moon_icon.png' : 'images/sun_icon.png';
    }
}

async function initApp() {
    try {
        const savedHandle = await data.getHandle();
        if (savedHandle) {
            const permissionStatus = await savedHandle.queryPermission({ mode: 'readwrite' });
            if (permissionStatus === 'granted') {
                await connectToHandle(savedHandle);
            } else {
                const dbStatusEl = ui.elements.dbStatusEl;
                if (dbStatusEl) {
                    dbStatusEl.textContent = "Click to Reconnect";
                    dbStatusEl.classList.add('disconnect');
                    dbStatusEl.addEventListener('click', async () => {
                        if ((await savedHandle.requestPermission({ mode: 'readwrite' })) === 'granted') {
                            await connectToHandle(savedHandle);
                        }
                    }, { once: true });
                }
            }
        }
    } catch (e) {
        console.error("App init failed", e);
    }
    updateAppUI();
}

async function connectToHandle(handle) {
    try {
        data.setFileHandle(handle);
        const file = await handle.getFile();
        const text = await file.text();
        const dbContents = JSON.parse(text || "{}");
        data.setPortfolio(dbContents.assets || []);
        ui.updateStatusUI(true, handle.name, dbContents.lastUpdated);
        updateAppUI();
    } catch (e) {
        console.error("Connection failed", e);
    }
}

function updateAppUI() {
    ui.renderPortfolio(data.portfolio, isEditMode);
}

function toggleEditMode(active) {
    isEditMode = active;
    if (active) {
        portfolioBackup = JSON.parse(JSON.stringify(data.portfolio));
        ui.toggleEditModeUI(true);
    } else {
        if (portfolioBackup) {
            data.setPortfolio(portfolioBackup);
            portfolioBackup = null;
        }
        ui.toggleEditModeUI(false);
        updateAppUI();
    }
}

function setupEventListeners() {
    const { elements } = ui;

    // Navigation
    const navActions = {
        'dashboard-nav': 'dashboard',
        'portfolio-nav': 'portfolio',
        'db-nav': 'database'
    };

    Object.entries(navActions).forEach(([id, view]) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                ui.showView(view);
            });
        }
    });

    // Brand Logo Click -> Dashboard
    const brandLogo = document.getElementById('brand-logo-area');
    if (brandLogo) {
        brandLogo.addEventListener('click', () => ui.showView('dashboard'));
    }

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    if (elements.aboutNavBtn) {
        elements.aboutNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (elements.aboutModal) elements.aboutModal.style.display = 'flex';
        });
    }

    // Modals
    if (elements.closeAboutBtn) {
        elements.closeAboutBtn.addEventListener('click', () => {
            elements.aboutModal.style.display = 'none';
        });
    }

    if (elements.addAssetBtn) {
        elements.addAssetBtn.addEventListener('click', () => {
            elements.assetModal.style.display = 'flex';
        });
    }

    if (elements.closeModalBtn) {
        elements.closeModalBtn.addEventListener('click', () => {
            elements.assetModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (elements.assetModal && e.target == elements.assetModal) {
            elements.assetModal.style.display = 'none';
        }
    });

    // Database Actions
    const connectBtn = document.getElementById('btn-connect-existing');
    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            try {
                const [handle] = await window.showOpenFilePicker({
                    types: [{ description: 'JSON Database', accept: { 'application/json': ['.json'] } }]
                });
                await connectToHandle(handle);
                await data.setHandle(handle);
            } catch (e) { console.warn("Picker aborted", e); }
        });
    }

    const createBtn = document.getElementById('btn-create-new');
    if (createBtn) {
        createBtn.addEventListener('click', async () => {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: 'database.json',
                    types: [{ description: 'JSON Database', accept: { 'application/json': ['.json'] } }]
                });
                data.setPortfolio([]);
                data.setFileHandle(handle);
                await data.savePortfolio();
                await data.setHandle(handle);
                ui.updateStatusUI(true, handle.name);
                updateAppUI();
                alert("New database created successfully!");
            } catch (e) { console.warn("Save picker aborted", e); }
        });
    }

    // Portfolio Actions (Edit Mode)
    if (elements.editModeBtn) {
        elements.editModeBtn.addEventListener('click', () => toggleEditMode(true));
    }

    const cancelBtn = document.getElementById('cancel-edit-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => toggleEditMode(false));
    }

    const saveBtn = document.getElementById('save-changes-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const timestamp = await data.savePortfolio();
            isEditMode = false;
            portfolioBackup = null;
            ui.toggleEditModeUI(false);
            ui.updateStatusUI(true, data.fileHandle?.name, timestamp);
            updateAppUI();
        });
    }

    // Form Submission
    if (elements.addAssetForm) {
        elements.addAssetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const assetData = {
                id: document.getElementById('asset-id').value.toUpperCase().trim(),
                category: document.getElementById('asset-category').value.trim() || "Uncategorized",
                amount: parseFloat(document.getElementById('asset-amount').value) || 0,
                cost: parseFloat(document.getElementById('asset-cost').value) || 0,
                circulatingSupply: document.getElementById('asset-circulating').value.trim(),
                maxSupply: document.getElementById('asset-max').value.trim(),
                risk: document.getElementById('asset-risk').value
            };

            data.addOrUpdateAsset(assetData);
            await data.savePortfolio();
            updateAppUI();
            elements.assetModal.style.display = 'none';
            elements.addAssetForm.reset();
        });
    }

    // Delegated Events for Table
    if (elements.assetsBody) {
        elements.assetsBody.addEventListener('click', async (e) => {
            const target = e.target;
            const row = target.closest('tr');
            if (!row) return;
            const id = row.dataset.id;

            if (target.dataset.action === 'delete') {
                if (confirm(`Remove ${id.toUpperCase()} from portfolio?`)) {
                    data.deleteAsset(id);
                    updateAppUI();
                }
            } else if (target.dataset.action === 'cycle-risk') {
                if (isEditMode) {
                    data.cycleRisk(id);
                    updateAppUI();
                }
            }
        });

        elements.assetsBody.addEventListener('focusout', (e) => {
            const target = e.target;
            if (target.classList.contains('editable-cell')) {
                const tr = target.closest('tr');
                if (tr) {
                    const id = tr.dataset.id;
                    const field = target.dataset.field;
                    data.updateField(id, field, target.innerText);
                }
            }
        });

        // Drag and Drop
        elements.assetsBody.addEventListener('dragstart', (e) => {
            const row = e.target.closest('tr');
            if (!isEditMode || !row) return e.preventDefault();
            draggedId = row.dataset.id;
            row.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        elements.assetsBody.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!isEditMode) return;
            const row = e.target.closest('tr');
            if (row) row.classList.add('drag-over');
        });

        elements.assetsBody.addEventListener('dragleave', (e) => {
            const row = e.target.closest('tr');
            if (row) row.classList.remove('drag-over');
        });

        elements.assetsBody.addEventListener('drop', async (e) => {
            e.preventDefault();
            const row = e.target.closest('tr');
            if (!isEditMode || !row) return;
            const targetId = row.dataset.id;
            row.classList.remove('drag-over');

            if (draggedId && draggedId !== targetId) {
                const portfolio = data.portfolio;
                const fromIndex = portfolio.findIndex(p => p.id === draggedId);
                const toIndex = portfolio.findIndex(p => p.id === targetId);
                if (fromIndex !== -1 && toIndex !== -1) {
                    const [movedAsset] = portfolio.splice(fromIndex, 1);
                    portfolio.splice(toIndex, 0, movedAsset);
                    updateAppUI();
                }
            }
        });

        elements.assetsBody.addEventListener('dragend', (e) => {
            const row = e.target.closest('tr');
            if (row) row.classList.remove('dragging');
            elements.assetsBody.querySelectorAll('tr').forEach(tr => tr.classList.remove('drag-over'));
        });
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    console.log('WhaleStack Standalone Initializing...');

    // PWA features require a secure context (https/http), 
    // but we'll leave the check here for future compatibility
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (err) {
            console.warn('Service Worker registration skipped (expected in file:///)');
        }
    }

    initTheme();
    await initApp();
    setupEventListeners();

    // External File Sync Check
    setInterval(async () => {
        const changes = await data.checkForExternalChanges();
        if (changes) {
            ui.renderPortfolio(changes.portfolio, isEditMode);
            if (changes.lastUpdate) {
                ui.updateStatusUI(true, data.fileHandle?.name, changes.lastUpdate);
            }
        }
    }, 2000);

    // Live Prices Update (Every 10 seconds)
    fetchLivePrices();
    setInterval(fetchLivePrices, 10000);

    // Initial Sentiment & Funding Fetch
    fetchMarketSentiment();
    fetchFundingRate();
    setInterval(fetchFundingRate, 30000); // Funding usually changes slowly (every 8h but rate updates more often)
});

async function fetchFundingRate() {
    try {
        const response = await fetch('https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT');
        const data = await response.json();
        const rate = parseFloat(data.lastFundingRate);
        const ratePct = (rate * 100).toFixed(4);
        const nextTime = parseInt(data.nextFundingTime);

        const el = document.getElementById('btc-funding');
        const countdownEl = document.getElementById('funding-countdown');

        if (el) {
            el.innerText = `${ratePct > 0 ? '+' : ''}${ratePct}%`;
            el.classList.remove('up', 'down');
            el.classList.add(rate >= 0 ? 'up' : 'down');
        }

        if (countdownEl && nextTime) {
            const now = Date.now();
            const diff = nextTime - now;
            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                countdownEl.innerText = `${hours}h ${mins}m left`;
            } else {
                countdownEl.innerText = "Settling...";
            }
        }
    } catch (err) {
        console.warn('Funding fetch failed');
        const el = document.getElementById('btc-funding');
        if (el) el.innerText = '---';
    }
}

async function fetchMarketSentiment() {
    try {
        const response = await fetch('https://api.alternative.me/fng/');
        const data = await response.json();
        const fng = data.data[0];

        const needle = document.getElementById('fng-needle');
        const valueEl = document.getElementById('fng-value');
        const labelEl = document.getElementById('fng-classification');

        if (needle && valueEl && labelEl) {
            const val = parseInt(fng.value);
            // Map 0-100 to -90deg to +90deg
            const rotation = (val * 1.8) - 0; // 0 is -90, 100 is 90
            needle.style.transform = `rotate(${rotation - 90}deg)`;
            valueEl.innerText = val;
            labelEl.innerText = fng.value_classification;

            // Dynamic Label Color
            if (val < 40) labelEl.style.color = '#e74c3c';
            else if (val < 60) labelEl.style.color = '#f1c40f';
            else labelEl.style.color = '#2ecc71';
        }
    } catch (err) {
        console.warn('Sentiment fetch failed');
    }
}

async function fetchLivePrices() {
    // 1. Fetch Crypto (Binance)
    const cryptoSymbols = ['BTCUSDT', 'ETHUSDT'];
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(cryptoSymbols)}`);
        const bData = await response.json();
        bData.forEach(ticker => {
            let prefix = 'btc';
            if (ticker.symbol === 'ETHUSDT') prefix = 'eth';
            updateMarketRow(prefix, ticker.lastPrice, ticker.priceChangePercent, 'USD');
        });
    } catch (err) {
        console.warn('Crypto fetch failed');
        ['btc', 'eth'].forEach(id => setErrorRow(id));
    }

    // 2. Fetch Gold (Gold-API)
    try {
        const response = await fetch('https://api.gold-api.com/price/XAU');
        const gData = await response.json();
        updateMarketRow('gold', gData.price, null, 'USD'); // Global Gold API often lacks 24h pct in simple endpoint
    } catch (err) {
        setErrorRow('gold');
    }

    // 3. Fetch Market Indices (Yahoo via Proxy)
    // S&P 500 (^GSPC), Nasdaq (^IXIC), Dow (^DJI), Brent (BZ=F)
    const indices = [
        { id: 'sp500', sym: '^GSPC' },
        { id: 'nasdaq', sym: '^IXIC' },
        { id: 'dow', sym: '^DJI' },
        { id: 'brent', sym: 'BZ=F' }
    ];

    indices.forEach(async (index) => {
        try {
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${index.sym}?interval=1d&range=1d`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            const contents = JSON.parse(data.contents);
            const result = contents.chart.result[0];
            const price = result.meta.regularMarketPrice;
            const prevClose = result.meta.chartPreviousClose;
            const change = ((price - prevClose) / prevClose) * 100;

            updateMarketRow(index.id, price, change, 'USD');
        } catch (err) {
            console.error(`Fetch failed for ${index.id}:`, err);
            setErrorRow(index.id);
        }
    });
}

function setErrorRow(id) {
    const priceEl = document.getElementById(`${id}-price`);
    const badgeEl = document.getElementById(`${id}-badge`);
    if (priceEl) priceEl.innerText = '---';
    if (badgeEl) badgeEl.innerText = '';
}

function updateMarketRow(id, price, change, currency) {
    const priceEl = document.getElementById(`${id}-price`);
    const badgeEl = document.getElementById(`${id}-badge`);

    if (priceEl && price) {
        const pVal = typeof price === 'number' ? price : parseFloat(price);
        const newText = `${pVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (pVal > 100 ? 2 : 4) })} ${currency}`;

        if (priceEl.innerText !== newText && priceEl.innerText !== 'Loading...') {
            priceEl.classList.remove('price-flash');
            void priceEl.offsetWidth;
            priceEl.classList.add('price-flash');
        }
        priceEl.innerText = newText;
    }

    if (badgeEl && change !== null) {
        const cVal = typeof change === 'number' ? change : parseFloat(change);
        badgeEl.innerText = `(${cVal > 0 ? '+' : ''}${cVal.toFixed(2)}%)`;
        badgeEl.classList.remove('up', 'down');
        badgeEl.classList.add(cVal >= 0 ? 'up' : 'down');
    }
}
