// State
let assets = [];
let editingId = null;

// DOM Elements
const assetForm = document.getElementById('assetForm');
const assetNameInput = document.getElementById('assetName');
const amountInput = document.getElementById('amount');
const priceInput = document.getElementById('price');
const currentPriceInput = document.getElementById('currentPrice');
const circSupplyInput = document.getElementById('circSupply');
const maxSupplyInput = document.getElementById('maxSupply');
const rowColorInput = document.getElementById('rowColor');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const tableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');

// Summary Element DOMs
const summaryTotalValue = document.getElementById('summaryTotalValue');
const summaryTotalPL = document.getElementById('summaryTotalPL');
const totalPLContainer = document.getElementById('totalPLContainer');

// Dropdown Action Elements
const importBtn = document.getElementById('importBtn');
const fileInput = document.getElementById('fileInput');
const exportJsonBtn = document.getElementById('exportJsonBtn');

// Modal Elements
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close-btn');

const addAssetModal = document.getElementById('addAssetModal');
const openAddAssetModalBtn = document.getElementById('openAddAssetModalBtn');
const closeAddAssetModal = document.getElementById('closeAddAssetModal');

const toastIcon = document.getElementById('toastIcon');

const toolsBtn = document.getElementById('toolsBtn');
const toolsModal = document.getElementById('toolsModal');
const closeToolsModal = document.getElementById('closeToolsModal');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Init
function init() {
    loadAssets();
    renderTable();
    setupEventListeners();
    loadThemePreference();
}

// Load data from localStorage
function loadAssets() {
    const savedAssets = localStorage.getItem('cryptoPortfolio');
    if (savedAssets) {
        try {
            assets = JSON.parse(savedAssets);
        } catch (e) {
            console.error('Error parsing data:', e);
            assets = [];
        }
    }
}

// Save data to localStorage
function saveAssets() {
    try {
        localStorage.setItem('cryptoPortfolio', JSON.stringify(assets));
    } catch (e) {
        console.error('Storage quota exceeded or unavailable:', e);
        showToast('Warning: LocalStorage might be full or blocked.', true);
    }
}

// Format current date
function getCurrentDateFormatted() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Render Table
function renderTable(filterText = '') {
    tableBody.innerHTML = '';

    const mappedAssets = assets.map((a, index) => ({ ...a, originalIndex: index }));

    // Filter assets
    const filteredAssets = mappedAssets.filter(asset => {
        const text = filterText.toLowerCase();
        return asset.name.toLowerCase().includes(text);
    });

    if (filteredAssets.length === 0) {
        emptyState.classList.remove('hidden');
        document.querySelector('.table-responsive').classList.add('hidden');

        // Reset Summaries
        if (summaryTotalValue) summaryTotalValue.textContent = '$0.00';
        if (summaryTotalPL) summaryTotalPL.textContent = '$0.00';
        if (totalPLContainer) totalPLContainer.classList.add('hidden');

    } else {
        emptyState.classList.add('hidden');
        document.querySelector('.table-responsive').classList.remove('hidden');

        let absoluteTotalVal = 0;
        let absoluteBuyVal = 0;

        // Identify max 'totalValue' for progress bar and metrics
        // We include originalIndex to support dragging without mixing up state
        const processedAssets = filteredAssets.map(a => {
            const amt = parseFloat(a.amount) || 0;
            const prc = parseFloat(a.price) || 0;
            const curPrc = parseFloat(a.currentPrice) || 0;
            const tVal = amt * curPrc; // Total value should be based on current price
            const buyVal = amt * prc; // Original buy value

            absoluteTotalVal += tVal;
            absoluteBuyVal += buyVal;

            let profitLoss = 0;
            let profitLossPercent = 0;
            if (prc >= 0) {
                profitLoss = (curPrc - prc) * amt;
                if (prc === 0 && curPrc > 0) {
                    profitLossPercent = Infinity;
                } else if (prc > 0) {
                    profitLossPercent = ((curPrc - prc) / prc) * 100;
                }
            }

            return {
                ...a,
                totalValue: tVal,
                amtStr: amt,
                prcStr: prc,
                curPrcStr: curPrc,
                profitLoss: profitLoss,
                profitLossPercent: profitLossPercent
            };
        });

        // Sort by total value, highest first
        processedAssets.sort((a, b) => b.totalValue - a.totalValue);

        const maxTotalValue = Math.max(...processedAssets.map(a => a.totalValue));

        // Update Summaries
        if (summaryTotalValue) summaryTotalValue.textContent = absoluteTotalVal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        // Total Portfolio P/L Calculation
        if (summaryTotalPL && totalPLContainer) {
            const totalPLAmount = absoluteTotalVal - absoluteBuyVal;
            const totalPLPercent = absoluteBuyVal > 0 ? (totalPLAmount / absoluteBuyVal) * 100 : 0;

            const plFormatted = totalPLAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', signDisplay: 'always' });
            const plPercentFormatted = totalPLPercent.toFixed(2) + '%';

            summaryTotalPL.textContent = `${plFormatted} (${plPercentFormatted})`;
            totalPLContainer.classList.remove('hidden');

            // Color coding for total P/L
            if (totalPLAmount >= 0) {
                summaryTotalPL.className = 'balance-value profit-text';
            } else {
                summaryTotalPL.className = 'balance-value loss-text';
            }
        }

        processedAssets.forEach(asset => {
            const tr = document.createElement('tr');

            const percentage = maxTotalValue > 0 ? (asset.totalValue / maxTotalValue) * 100 : 0;

            const valFormatted = asset.totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            const priceFormatted = asset.prcStr.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            const currentPriceFormatted = asset.curPrcStr.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

            const plFormatted = asset.profitLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD', signDisplay: 'always' });
            let plPercentFormatted = '0.00%';
            if (asset.profitLossPercent === Infinity) {
                plPercentFormatted = '∞% (Airdrop)';
            } else {
                plPercentFormatted = asset.profitLossPercent.toFixed(2) + '%';
            }
            const plClass = asset.profitLoss >= 0 ? 'profit-text' : 'loss-text';

            let riskClass = '';
            let riskText = '';
            if (asset.color === 'low') { riskClass = 'risk-low'; riskText = 'LOW'; }
            else if (asset.color === 'medium') { riskClass = 'risk-medium'; riskText = 'MED'; }
            else if (asset.color === 'high') { riskClass = 'risk-high'; riskText = 'HIGH'; }
            else { riskClass = 'risk-low'; riskText = 'LOW'; }

            // XSS Safe Column Rendering
            tr.innerHTML = `
                <td class="asset-name-bold">${escapeHTML(asset.name.toUpperCase())}</td>
                <td class="amount-bold">
                    <div class="amount-container">
                        <span class="amount-text">${escapeHTML(String(asset.amount || '0'))}</span>
                        <div class="amount-bar-bg">
                            <div class="amount-bar-fill" title="Valued at: ${valFormatted}" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                </td>
                <td>${priceFormatted}</td>
                <td>${currentPriceFormatted}</td>
                <td>${asset.circSupply ? Number(asset.circSupply).toLocaleString('en-US') : '∞'}</td>
                <td>${asset.maxSupply ? Number(asset.maxSupply).toLocaleString('en-US') : '∞'}</td>
                <td class="${plClass} amount-bold">${plFormatted} (${plPercentFormatted})</td>
                <td><span class="risk-badge ${riskClass}">${riskText}</span></td>
                <td>
                    <div class="row-actions">
                        <button class="icon-btn edit" onclick="editAsset('${escapeHTML(asset.id)}')" title="Edit" aria-label="Edit ${escapeHTML(asset.name)}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="icon-btn delete" onclick="deleteAsset('${escapeHTML(asset.id)}')" title="Delete" aria-label="Delete ${escapeHTML(asset.name)}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Form Submit
    assetForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveFormAsset();
    });

    cancelEditBtn.addEventListener('click', function () {
        resetForm();
        addAssetModal.style.display = 'none';
    });

    // TRY Conversion Button
    const convertTRYBtn = document.getElementById('convertTRYBtn');
    if (convertTRYBtn) {
        convertTRYBtn.addEventListener('click', () => {
            const rawText = summaryTotalValue ? summaryTotalValue.textContent : '0';
            // Strip '$', commas and whitespace to get a clean number
            const amount = rawText.replace(/[$,\s]/g, '');
            const numericAmount = parseFloat(amount) || 0;
            const query = encodeURIComponent(`${numericAmount} USD to TRY`);
            window.open(`https://www.google.com/search?q=${query}`, '_blank');
        });
    }

    searchInput.addEventListener('input', function (e) {
        renderTable(e.target.value);
    });

    // Add Asset Modal Listeners
    if (openAddAssetModalBtn) {
        openAddAssetModalBtn.addEventListener('click', () => {
            resetForm();
            addAssetModal.style.display = 'flex';
            const heading = document.querySelector('.add-asset-modal-content h2');
            if (heading) heading.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Add New Asset';
        });
    }

    if (closeAddAssetModal) {
        closeAddAssetModal.addEventListener('click', () => {
            addAssetModal.style.display = 'none';
            resetForm();
        });
    }

    // Existing About Modal
    aboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
        if (e.target === addAssetModal) {
            addAssetModal.style.display = 'none';
            resetForm();
        }
        if (e.target === toolsModal) {
            toolsModal.style.display = 'none';
        }
    });

    // Tools Modal
    if (toolsBtn) {
        toolsBtn.addEventListener('click', () => {
            toolsModal.style.display = 'flex';
        });
    }

    if (closeToolsModal) {
        closeToolsModal.addEventListener('click', () => {
            toolsModal.style.display = 'none';
        });
    }

    // Action Events - Unified Import
    importBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        if (file.name.toLowerCase().endsWith('.json')) {
            reader.onload = function (e) {
                try {
                    let importedData = JSON.parse(e.target.result);
                    // Handle new format { assets: [], portfolioLastEdit: ... } or old format [ ... ]
                    if (!Array.isArray(importedData) && importedData.assets) {
                        if (importedData.portfolioLastEdit) {
                            localStorage.setItem('portfolioLastUpdated', importedData.portfolioLastEdit);
                        }
                        importedData = importedData.assets;
                    }

                    if (Array.isArray(importedData)) {
                        assets = importedData;
                        saveAssets();
                        renderTable(searchInput.value);
                        updateGlobalTimestamp(localStorage.getItem('portfolioLastUpdated')); // Refresh UI timestamp
                        showToast('JSON Portfolio imported successfully.');
                    } else {
                        showToast('Invalid JSON file format.', true);
                    }
                } catch (err) {
                    showToast('JSON File read error.', true);
                }
            };
        } else {
            showToast('Only JSON files are supported.', true);
            fileInput.value = ''; // Reset
            return;
        }

        reader.readAsText(file);
        fileInput.value = ''; // Reset
    });

    exportJsonBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (assets.length === 0) {
            showToast('No assets found to export!', true);
            return;
        }

        // Create export object with global timestamp
        const exportObj = {
            assets: assets,
            portfolioLastEdit: localStorage.getItem('portfolioLastUpdated') || getCurrentDateFormatted()
        };
        const dataStr = JSON.stringify(exportObj, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        triggerDownload(dataUri, 'crypto_portfolio.json');
        showToast('JSON backup file is downloading.');
    });

    // Global Last Updated DOM
    const lastUpdatedGlobal = document.getElementById('lastUpdatedGlobal');
    if (lastUpdatedGlobal) {
        const savedTime = localStorage.getItem('portfolioLastUpdated');
        if (savedTime) lastUpdatedGlobal.textContent = `Last update: ${savedTime}`;
    }
}

// Update Global Timestamp
function updateGlobalTimestamp(specificTime = null) {
    const formattedDate = specificTime || getCurrentDateFormatted();
    try {
        localStorage.setItem('portfolioLastUpdated', formattedDate);
    } catch (e) {
        console.error('Failed to save timestamp:', e);
    }
    const lastUpdatedGlobal = document.getElementById('lastUpdatedGlobal');
    if (lastUpdatedGlobal) {
        lastUpdatedGlobal.textContent = `Last update: ${formattedDate}`;
    }
}

// Utility Function for Download
function triggerDownload(dataUri, filename) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.style.display = 'none';
    document.body.appendChild(linkElement); // Required for Firefox
    linkElement.click();
    document.body.removeChild(linkElement);
}

// XSS Prevention Utility
function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
}

// Save Asset (Add new or Update existing)
function saveFormAsset() {
    const nameStr = assetNameInput.value.trim().toUpperCase();
    const amtStr = amountInput.value.trim();
    const priceStr = priceInput.value.trim();
    const currentPriceStr = currentPriceInput.value.trim();
    const circStr = circSupplyInput.value.trim();
    const maxStr = maxSupplyInput.value.trim();

    // Strict Validation
    if (!nameStr || !amtStr || !priceStr || !currentPriceStr) {
        showToast('Please fill all required fields.', true);
        return;
    }

    const amtNum = parseFloat(amtStr);
    const priceNum = parseFloat(priceStr);
    const currentPriceNum = parseFloat(currentPriceStr);

    if (isNaN(amtNum) || amtNum < 0 || isNaN(priceNum) || priceNum < 0 || isNaN(currentPriceNum) || currentPriceNum < 0) {
        showToast('Amount, Price and Current Price must be valid positive numbers.', true);
        return;
    }

    // Supply fields Validation (Must be empty or strictly numeric)
    let circNum = circStr !== '' ? parseFloat(circStr) : null;
    let maxNum = maxStr !== '' ? parseFloat(maxStr) : null;

    if ((circNum !== null && (isNaN(circNum) || circNum < 0)) ||
        (maxNum !== null && (isNaN(maxNum) || maxNum < 0))) {
        showToast('Supply fields must be valid positive numbers or left blank.', true);
        return;
    }

    const newAsset = {
        name: nameStr,
        amount: amtStr,
        price: priceStr,
        currentPrice: currentPriceStr,
        circSupply: circStr,
        maxSupply: maxStr,
        color: rowColorInput.value,
        lastEdit: getCurrentDateFormatted()
    };

    if (editingId) {
        // Update
        const index = assets.findIndex(a => a.id === editingId);
        if (index !== -1) {
            newAsset.id = editingId;
            assets[index] = newAsset;
            showToast(`${newAsset.name} updated successfully.`);
        }
    } else {
        // Add
        newAsset.id = Date.now().toString();
        assets.push(newAsset);
        showToast(`${newAsset.name} added to portfolio.`);
    }

    updateGlobalTimestamp();
    saveAssets();
    renderTable(searchInput.value);
    resetForm();
    addAssetModal.style.display = 'none'; // Close modal after saving
}

// Edit Asset
window.editAsset = function (id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) return;

    editingId = id;

    assetNameInput.value = asset.name;
    amountInput.value = asset.amount || '';
    priceInput.value = asset.price || '';
    currentPriceInput.value = asset.currentPrice || '';
    circSupplyInput.value = asset.circSupply || '';
    maxSupplyInput.value = asset.maxSupply || '';
    rowColorInput.value = asset.color || 'low';

    submitBtn.textContent = 'Save Changes';
    cancelEditBtn.style.display = 'inline-block';

    // Update form section heading visually
    const formHeading = document.querySelector('.add-asset-modal-content h2');
    if (formHeading) formHeading.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Asset';

    // Open the modal instead of scrolling
    addAssetModal.style.display = 'flex';
};

// Delete Asset
window.deleteAsset = function (id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) {
        showToast('Asset not found.', true);
        return;
    }
    if (confirm(`Are you sure you want to delete '${asset.name}'?`)) {
        assets = assets.filter(a => a.id !== id);
        updateGlobalTimestamp();
        saveAssets();
        renderTable(searchInput.value);
        showToast('Asset deleted.');

        if (editingId === id) {
            resetForm();
        }
    }
};

// Reset Form
function resetForm() {
    assetForm.reset();
    editingId = null;
    submitBtn.textContent = 'Add Asset';
    cancelEditBtn.style.display = 'none';

    // Revert form heading inside modal
    const formHeading = document.querySelector('.add-asset-modal-content h2');
    if (formHeading) formHeading.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Add New Asset';
}

// Show Toast Notification
let toastTimeout;
function showToast(message, isError = false) {
    toastMessage.textContent = message;

    if (isError) {
        toast.classList.add('error');
        toastIcon.className = 'fa-solid fa-circle-exclamation';
    } else {
        toast.classList.remove('error');
        toastIcon.className = 'fa-solid fa-check-circle';
    }

    toast.classList.remove('hidden');
    toast.style.opacity = '1';

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
}

// Start app
init();

// ===== Theme Toggle Logic =====
function loadThemePreference() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('whalestack-theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.checked = true;
    }
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('change', () => {
        try {
            if (themeToggle.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('whalestack-theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('whalestack-theme', 'dark');
            }
        } catch (e) {
            console.error("Local storage error:", e);
        }
    });
}

setupThemeToggle();
