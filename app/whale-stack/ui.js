export const elements = {
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
};

let balanceChartInstance = null;


export function showView(viewName) {
    const views = {
        'dashboard': { el: elements.dashboardView, nav: elements.dashboardNavBtn },
        'portfolio': { el: elements.portfolioView, nav: elements.portfolioNavBtn },
        'database': { el: elements.dbView, nav: elements.dbNavBtn }
    };

    Object.values(views).forEach(v => {
        if (v.el) v.el.style.display = 'none';
        if (v.nav) v.nav.classList.remove('active');
    });

    const active = views[viewName];
    if (active && active.el && active.nav) {
        active.el.style.display = (viewName === 'dashboard') ? 'flex' : 'block';
        active.nav.classList.add('active');
    }
}

export function updateStatusUI(isConnected, fileName, lastUpdated) {
    const statusText = isConnected ? "Connected" : "No DB Connected";
    const statusClass = isConnected ? "status-badge connect" : "status-badge disconnect";

    const { dbStatusEl, dbMgrStatusEl, activeFileEl, dbMgrFileRow, dbMgrFileNameEl, lastUpdatedContainer, globalLastUpdatedEl } = elements;

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
}

export function renderPortfolio(portfolio, isEditMode) {
    const { assetsBody, totalBalanceEl, totalChangeEl } = elements;

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
    if (totalChangeEl) totalChangeEl.innerHTML = `<span class="percent" style="color:var(--text-muted); font-weight:400">Local Inventory View (Cost-based Val)</span>`;

    updateAllocationUI(chartLabels, chartValues, totalVal);
    return totalVal;
}

function updateAllocationUI(labels, values, total) {
    const listEl = elements.allocationList;
    const chartEl = elements.balanceChart;
    if (!listEl || !chartEl) return;

    const colors = [
        '#4e5ba6', '#00d1ff', '#ff3b5e', '#ff9f43', '#feca57',
        '#5f27cd', '#48dbfb', '#ff9ff3', '#00d09c', '#00ca96',
        '#ff4d4f', '#52c41a', '#faad14', '#fa8c16', '#ff851b'
    ];

    // Update Numerical List
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

    // Update Chart.js Instance
    if (balanceChartInstance) {
        balanceChartInstance.destroy();
    }

    if (total > 0) {
        balanceChartInstance = new Chart(chartEl, {
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
                cutout: '75%',
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
}

export function toggleEditModeUI(active) {
    const { editModeBtn, editControls, addAssetBtn } = elements;
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
