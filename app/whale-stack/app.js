import * as data from './data.js';
import * as ui from './ui.js';

let isEditMode = false;
let portfolioBackup = null;
let draggedId = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    console.log('WhaleStack Initializing...');

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (err) {
            console.warn('Service Worker registration failed', err);
        }
    }

    await initApp();
    setupEventListeners();

    // External File Sync Check (2 seconds)
    setInterval(async () => {
        const changes = await data.checkForExternalChanges();
        if (changes) {
            ui.renderPortfolio(changes.portfolio, isEditMode);
            if (changes.lastUpdate) {
                ui.updateStatusUI(true, data.fileHandle?.name, changes.lastUpdate);
            }
        }
    }, 2000);
});

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

// --- Event Handlers ---
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
