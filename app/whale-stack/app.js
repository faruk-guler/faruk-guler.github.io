// HODLStack v3.9 - Integrated Asset Manager & Long-term Tracker
let portfolio = [];
let fileHandle = null;
let chart = null;
let balanceChart = null;
let isUpdating = false;
let lastFileTimestamp = 0;
let isSaving = false; // Flag to prevent self-triggering sync during app saves

// DOM Elements
const assetModal = document.getElementById('asset-modal');
const addAssetBtn = document.getElementById('add-asset-btn');
const aboutNavBtn = document.getElementById('about-nav');
const dashboardNavBtn = document.getElementById('dashboard-nav');
const connectDbBtn = document.getElementById('connect-db-btn');
const createDbBtn = document.getElementById('create-db-btn');
const closeModalBtn = document.getElementById('close-modal');
const addAssetForm = document.getElementById('add-asset-form');
const assetsBody = document.getElementById('assets-body');
const dashboardView = document.getElementById('dashboard-view');
const portfolioNavBtn = document.getElementById('portfolio-nav');
const portfolioView = document.getElementById('portfolio-view');
const aboutView = document.getElementById('about-view');
const totalBalanceEl = document.getElementById('total-balance');
const totalChangeEl = document.getElementById('total-change');
const dbStatusEl = document.getElementById('db-status');
const dbMgrStatusEl = document.getElementById('db-manager-status');
const activeFileEl = document.getElementById('active-filename');
const dbNavBtn = document.getElementById('db-nav');
const dbView = document.getElementById('db-view');
const aboutModal = document.getElementById('about-modal');
const closeAboutBtn = document.getElementById('close-about-btn');
const dbMgrFileRow = document.getElementById('db-mgr-file-row');
const dbMgrFileNameEl = document.getElementById('db-mgr-filename');
const lastUpdatedContainer = document.getElementById('last-updated-container');
const globalLastUpdatedEl = document.getElementById('global-last-updated');

// Init
document.addEventListener('DOMContentLoaded', async () => {
    await initDBPersistence();
    updateUI();

    // Local Persistence only, no API update interval

    // External File Sync Check (2 seconds)
    setInterval(() => {
        if (fileHandle && !isSaving && !isUpdating) checkForExternalChanges();
    }, 2000);
});

// --- View Toggling ---
function showView(viewName) {
    const views = {
        'dashboard': { el: dashboardView, nav: dashboardNavBtn },
        'portfolio': { el: portfolioView, nav: portfolioNavBtn },
        'database': { el: dbView, nav: dbNavBtn }
    };

    Object.values(views).forEach(v => {
        v.el.style.display = 'none';
        v.nav.classList.remove('active');
    });

    const active = views[viewName];
    if (active && active.el && active.nav) {
        active.el.style.display = (viewName === 'dashboard') ? 'flex' : 'block';
        active.nav.classList.add('active');

        // UI Polish: Contextual Actions
        if (viewName === 'dashboard') {
            // No search box code needed here anymore
        }
    }
}

dashboardNavBtn.onclick = (e) => { e.preventDefault(); showView('dashboard'); };
if (portfolioNavBtn) portfolioNavBtn.onclick = () => showView('portfolio');
dbNavBtn.onclick = (e) => { e.preventDefault(); showView('database'); };
aboutNavBtn.onclick = (e) => { e.preventDefault(); aboutModal.style.display = 'flex'; };
closeAboutBtn.onclick = () => aboutModal.style.display = 'none';
addAssetBtn.onclick = () => assetModal.style.display = 'flex';
closeModalBtn.onclick = () => assetModal.style.display = 'none';

// Drag and Drop Logic
let draggedId = null;

function handleDragStart(e, id) {
    if (!isEditMode) return e.preventDefault();
    draggedId = id;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (!isEditMode) return e.preventDefault();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const tr = e.target.closest('tr');
    if (tr) tr.classList.add('drag-over');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('tr').forEach(tr => tr.classList.remove('drag-over'));
}

async function handleDrop(e, targetId) {
    e.preventDefault();
    if (draggedId === targetId) return;

    const fromIndex = portfolio.findIndex(p => p.id === draggedId);
    const toIndex = portfolio.findIndex(p => p.id === targetId);

    if (fromIndex !== -1 && toIndex !== -1) {
        const [movedAsset] = portfolio.splice(fromIndex, 1);
        portfolio.splice(toIndex, 0, movedAsset);
        if (!isEditMode) {
            await savePortfolio();
        }
        updateUI();
    }
}

function toggleEditMode(active) {
    isEditMode = active;
    const body = document.body;
    const editBtn = document.getElementById('edit-mode-btn');
    const editControls = document.getElementById('edit-controls');
    const addBtn = document.getElementById('add-asset-btn');

    if (active) {
        portfolioBackup = JSON.parse(JSON.stringify(portfolio));
        body.classList.add('editing-active');
        editBtn.style.display = 'none';
        editControls.style.display = 'flex';
        addBtn.disabled = false;
        addBtn.style.opacity = '1';
        addBtn.style.pointerEvents = 'auto';
    } else {
        if (portfolioBackup) {
            portfolio = portfolioBackup;
            portfolioBackup = null;
        }
        body.classList.remove('editing-active');
        editBtn.style.display = 'block';
        editControls.style.display = 'none';
        addBtn.disabled = true;
        addBtn.style.opacity = '0.5';
        addBtn.style.pointerEvents = 'none';
        updateUI();
    }
}

async function saveChanges() {
    await savePortfolio();
    isEditMode = false;
    portfolioBackup = null;
    document.body.classList.remove('editing-active');
    document.getElementById('edit-mode-btn').style.display = 'block';
    document.getElementById('edit-controls').style.display = 'none';
    updateUI();
}

// Make functions globally accessible for inline event handlers
window.del = del;
window.updateField = updateField;
window.toggleEditMode = toggleEditMode;
window.saveChanges = saveChanges;
window.handleDragStart = handleDragStart;
window.handleDragOver = handleDragOver;
window.handleDrop = handleDrop;
window.handleDragEnd = handleDragEnd;
window.showView = showView;

window.onclick = (e) => { if (e.target == assetModal) assetModal.style.display = 'none'; };

// --- Search Handler ---
sidebarSearch.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase().trim();
    updateUI();
});

// --- Persistence ---
let isEditMode = false;
let portfolioBackup = null;

async function initDBPersistence() {
    const savedHandle = await getHandle();
    if (savedHandle) {
        // Otomatik olarak izin durumunu kontrol et
        const permissionStatus = await savedHandle.queryPermission({ mode: 'readwrite' });

        if (permissionStatus === 'granted') {
            try {
                fileHandle = savedHandle;
                const file = await fileHandle.getFile();
                const text = await file.text();
                const dbContents = JSON.parse(text || "{}");
                portfolio = dbContents.assets || [];
                if (dbContents.lastUpdated && globalLastUpdatedEl) {
                    lastUpdatedContainer.style.display = 'block';
                    globalLastUpdatedEl.textContent = dbContents.lastUpdated;
                }
                onDatabaseConnected();
            } catch (e) {
                console.error("Auto-connect failed", e);
            }
        } else {
            // İzin verilmemişse kullanıcıya bildirim ver ve tıklama ile izin iste
            dbStatusEl.textContent = "Click to Reconnect";
            dbStatusEl.classList.add('disconnect');
            dbStatusEl.onclick = async () => {
                try {
                    if ((await savedHandle.requestPermission({ mode: 'readwrite' })) === 'granted') {
                        fileHandle = savedHandle;
                        const file = await fileHandle.getFile();
                        const text = await file.text();
                        const dbContents = JSON.parse(text || "{}");
                        portfolio = dbContents.assets || [];
                        onDatabaseConnected();
                    }
                } catch (e) {
                    console.error("Auth failed", e);
                }
            };
        }
    }
}
const DB_NAME = "WhaleStackDB";
const DB_VERSION = 1;

async function getHandle() {
    return new Promise(r => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
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
}

async function setHandle(handle) {
    return new Promise((r, j) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
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
}

// --- Data & API ---
document.getElementById('btn-connect-existing').onclick = async () => {
    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [{ description: 'JSON Database', accept: { 'application/json': ['.json'] } }]
        });
        const file = await fileHandle.getFile();
        portfolio = JSON.parse(await file.text() || "[]");
        await setHandle(fileHandle);
        onDatabaseConnected();
    } catch (e) {
        console.warn("Picker aborted", e);
    }
};

document.getElementById('btn-create-new').onclick = async () => {
    try {
        fileHandle = await window.showSaveFilePicker({
            suggestedName: 'database.json',
            types: [{ description: 'JSON Database', accept: { 'application/json': ['.json'] } }]
        });
        portfolio = [];
        await savePortfolio(); // Save initial empty array
        await setHandle(fileHandle);
        onDatabaseConnected();
        alert("New database created successfully!");
    } catch (e) {
        console.warn("Save picker aborted", e);
    }
};

function onDatabaseConnected() {
    const statusText = "Connected";
    const statusClass = "status-badge connect";

    dbStatusEl.textContent = statusText;
    dbStatusEl.className = statusClass;

    if (dbMgrStatusEl) {
        dbMgrStatusEl.textContent = statusText;
        dbMgrStatusEl.className = statusClass;
    }

    if (fileHandle) {
        const name = fileHandle.name;
        activeFileEl.style.display = 'block';
        activeFileEl.querySelector('.file-label').textContent = name;

        if (dbMgrFileRow) {
            dbMgrFileRow.style.display = 'flex';
            dbMgrFileNameEl.textContent = name;
        }
    }

    addAssetBtn.disabled = true;
    addAssetBtn.style.opacity = '0.5';
    addAssetBtn.style.pointerEvents = 'none';
    updateUI();
}

async function updateUI() {
    if (!fileHandle) {
        assetsBody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:40px; color:var(--text-muted)">Connect .json file to begin monitoring.</td></tr>';
        return;
    }
    if (isUpdating) return;
    isUpdating = true;

    try {
        let totalVal = 0, rows = '';
        const chartLabels = [], chartValues = [];

        // Render logic: Show everything in portfolio (No API)
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
            chartValues.push(val); // Use total value for the pie chart segments

            const editable = isEditMode ? 'contenteditable="true"' : 'contenteditable="false"';
            const draggable = isEditMode ? 'draggable="true"' : 'draggable="false"';

            rows += `
                <tr ${draggable} ondragstart="handleDragStart(event, '${p.id}')" ondragover="handleDragOver(event)" ondrop="handleDrop(event, '${p.id}')" ondragend="handleDragEnd(event)">
                    <td class="drag-handle edit-only">⋮⋮</td>
                    <td ${editable} onblur="updateField('${p.id}', 'id', this.innerText)" class="editable-cell" style="font-weight:800; border-right: 1px solid var(--border);">
                        ${p.id.toUpperCase()}
                    </td>
                    <td ${editable} onblur="updateField('${p.id}', 'category', this.innerText)" class="editable-cell">
                        ${p.category || ""}
                    </td>
                    <td ${editable} onblur="updateField('${p.id}', 'amount', this.innerText)" class="editable-cell" style="font-family: monospace; font-weight: 700;">
                        ${amount}
                    </td>
                    <td ${editable} onblur="updateField('${p.id}', 'cost', this.innerText)" class="editable-cell" style="font-family: monospace; font-weight: 700;">
                        ${cost.toFixed(2)}
                    </td>
                    <td ${editable} onblur="updateField('${p.id}', 'circulatingSupply', this.innerText)" class="editable-cell" style="font-family: monospace;">
                        ${p.circulatingSupply || "∞"}
                    </td>
                    <td ${editable} onblur="updateField('${p.id}', 'maxSupply', this.innerText)" class="editable-cell" style="font-family: monospace;">
                        ${p.maxSupply || "∞"}
                    </td>
                    <td style="text-align:center">
                        <span class="risk-badge risk-${(p.risk || 'Low').toLowerCase()}" 
                                onclick="cycleRisk('${p.id}')" 
                                style="${isEditMode ? 'cursor:pointer;' : 'cursor:default;'} user-select:none;" 
                                title="${isEditMode ? 'Click to cycle risk level' : ''}">
                            ${p.risk || 'Low'}
                        </span>
                    </td>
                    <td class="edit-only" style="text-align:center">
                        <button onclick="del('${p.id}')" class="delete-btn" title="Delete Asset">×</button>
                    </td>
                </tr>
            `;
        });

        assetsBody.innerHTML = rows || '<tr><td colspan="8" style="text-align:center; padding:20px;">No results found.</td></tr>';
        totalBalanceEl.innerText = `$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        totalChangeEl.innerHTML = `
            <span class="percent" style="color:var(--text-muted); font-weight:400">Local Inventory View (Cost-based Val)</span>
        `;

        updateAllocationList(chartLabels, chartValues, totalVal);
        const lineCtx = document.getElementById('balanceChart');
        if (lineCtx) lineCtx.style.display = 'none';

    } catch (e) {
        console.error("UI Update Failed", e);
    } finally {
        isUpdating = false;
    }
}

async function updateField(id, field, value) {
    if (!isEditMode) return;
    const item = portfolio.find(p => p.id === id);
    if (item) {
        item[field] = (field === 'amount' || field === 'cost') ? parseFloat(value) || 0 : value;
        item.lastEdit = formatDate(new Date());
        if (!isEditMode) {
            await savePortfolio();
        }
    }
}

async function del(id) {
    if (!isEditMode) return;
    if (confirm(`Remove ${id.toUpperCase()} from portfolio ? `)) {
        portfolio = portfolio.filter(p => p.id !== id);
        updateUI();
    }
}

async function savePortfolio() {
    if (!fileHandle) return;
    try {
        isSaving = true;
        const timestamp = formatDate(new Date());
        const dbData = {
            lastUpdated: timestamp,
            assets: portfolio
        };

        const w = await fileHandle.createWritable();
        await w.write(JSON.stringify(dbData, null, 2));
        await w.close();

        // Update Global UI Timestamp
        if (globalLastUpdatedEl) {
            lastUpdatedContainer.style.display = 'block';
            globalLastUpdatedEl.textContent = timestamp;
        }
    } catch (e) {
        console.error("Save Failed", e);
    } finally {
        setTimeout(() => isSaving = false, 500); // Small cooldown
    }
}

async function checkForExternalChanges() {
    try {
        const file = await fileHandle.getFile();
        if (file.lastModified > lastFileTimestamp) {
            console.log("External change detected, reloading...");
            const text = await file.text();
            try {
                const dbContents = JSON.parse(text);
                if (Array.isArray(dbContents)) {
                    portfolio = dbContents;
                } else if (dbContents.assets) {
                    portfolio = dbContents.assets;
                    if (dbContents.lastUpdated && globalLastUpdatedEl) {
                        lastUpdatedContainer.style.display = 'block';
                        globalLastUpdatedEl.textContent = dbContents.lastUpdated;
                    }
                }
                lastFileTimestamp = file.lastModified;
                updateUI();
            } catch (e) {
                console.warn("External file has invalid JSON or structure:", e);
                // Optionally notify UI
            }
        }
    } catch (e) {
        // Handle cases where file might be locked by another process
    }
}

function formatS(v) {
    if (!v || v === 0) return "∞";
    if (v > 1e9) return (v / 1e9).toFixed(1) + "B";
    if (v > 1e6) return (v / 1e6).toFixed(1) + "M";
    return Math.floor(v).toLocaleString();
}

function formatDate(d) {
    return d.toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function updateAllocationList(l, v, total) {
    const listContainer = document.getElementById('allocation-list');
    if (!listContainer) return;

    const colors = [
        '#4e5ba6', '#00d09c', '#ff3c5f', '#ff9f43', '#feca57',
        '#5f27cd', '#48dbfb', '#ff9ff3', '#00d1ff', '#00ca96',
        '#ff3b5e', '#ff4d4f', '#52c41a', '#faad14', '#fa8c16'
    ];

    let html = '';
    l.forEach((label, i) => {
        const val = v[i];
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

    listContainer.innerHTML = html || '<p style="text-align:center; color:var(--text-muted); padding-top:20px;">No allocation data</p>';
}

async function cycleRisk(id) {
    if (!isEditMode) return;
    const item = portfolio.find(p => p.id === id);
    if (!item) return;

    const levels = ['Low', 'Mid', 'High'];
    let currentIndex = levels.indexOf(item.risk || 'Low');
    let nextIndex = (currentIndex + 1) % levels.length;

    item.risk = levels[nextIndex];
    item.lastEdit = formatDate(new Date());

    updateUI();
    await savePortfolio();
}

function updateLine(p) {
    const ctx = document.getElementById('balanceChart').getContext('2d');
    if (balanceChart) balanceChart.destroy();
    const grad = ctx.createLinearGradient(0, 0, 0, 200);
    grad.addColorStop(0, 'rgba(78, 91, 166, 0.15)');
    grad.addColorStop(1, 'rgba(78, 91, 166, 0)');
    balanceChart = new Chart(ctx, {
        type: 'line',
        data: { labels: p.map((_, i) => i), datasets: [{ data: p, borderColor: '#4e5ba6', borderWidth: 2, pointRadius: 0, fill: true, backgroundColor: grad, tension: 0.4 }] },
        options: { scales: { x: { display: false }, y: { display: false } }, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
    });
}

// Add Asset Form
addAssetForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('asset-id').value.toUpperCase().trim();
    const category = document.getElementById('asset-category').value.trim() || "Uncategorized";
    const amount = parseFloat(document.getElementById('asset-amount').value) || 0;
    const cost = parseFloat(document.getElementById('asset-cost').value) || 0;
    const circulatingSupply = document.getElementById('asset-circulating').value.trim();
    const maxSupply = document.getElementById('asset-max').value.trim();
    const risk = document.getElementById('asset-risk').value;

    const exist = portfolio.find(p => p.id === id);
    if (exist) {
        const total = exist.amount + amount;
        exist.cost = ((exist.cost * exist.amount) + (cost * amount)) / total;
        exist.amount = total;
        exist.category = category; // Update category if provided
        exist.circulatingSupply = circulatingSupply || exist.circulatingSupply;
        exist.maxSupply = maxSupply || exist.maxSupply;
        exist.risk = risk;
        exist.lastEdit = formatDate(new Date());
    } else {
        portfolio.push({
            id, amount, cost, category,
            circulatingSupply: circulatingSupply || "∞",
            maxSupply: maxSupply || "∞",
            risk,
            lastEdit: formatDate(new Date())
        });
    }

    await savePortfolio();
    updateUI();
    assetModal.style.display = 'none';
    addAssetForm.reset();
};
