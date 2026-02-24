// State
let assets = [];
let editingId = null;

// DOM Elements
const assetForm = document.getElementById('assetForm');
const assetNameInput = document.getElementById('assetName');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const priceInput = document.getElementById('price');
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

// Dropdown Action Elements
const importBtn = document.getElementById('importBtn');
const fileInput = document.getElementById('fileInput');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const exportCsvBtn = document.getElementById('exportCsvBtn');

// Modal Elements
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close-btn');

const addAssetModal = document.getElementById('addAssetModal');
const openAddAssetModalBtn = document.getElementById('openAddAssetModalBtn');
const closeAddAssetModal = document.getElementById('closeAddAssetModal');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const toastIcon = document.getElementById('toastIcon');

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
    localStorage.setItem('cryptoPortfolio', JSON.stringify(assets));
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
        return asset.name.toLowerCase().includes(text) ||
            asset.category.toLowerCase().includes(text);
    });

    if (filteredAssets.length === 0) {
        emptyState.classList.remove('hidden');
        document.querySelector('.table-responsive').classList.add('hidden');

        // Reset Summaries
        if (summaryTotalValue) summaryTotalValue.textContent = '$0.00';

    } else {
        emptyState.classList.add('hidden');
        document.querySelector('.table-responsive').classList.remove('hidden');

        let absoluteTotalVal = 0;

        // Identify max 'totalValue' for progress bar and metrics
        // We include originalIndex to support dragging without mixing up state
        const processedAssets = filteredAssets.map(a => {
            const amt = parseFloat(a.amount) || 0;
            const prc = parseFloat(a.price) || 0;
            const tVal = amt * prc;

            absoluteTotalVal += tVal;

            return {
                ...a,
                totalValue: tVal,
                amtStr: amt,
                prcStr: prc
            };
        });

        // Sort by total value, highest first
        processedAssets.sort((a, b) => b.totalValue - a.totalValue);

        const maxTotalValue = Math.max(...processedAssets.map(a => a.totalValue));

        // Update Summaries
        if (summaryTotalValue) summaryTotalValue.textContent = absoluteTotalVal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        processedAssets.forEach(asset => {
            const tr = document.createElement('tr');

            const percentage = maxTotalValue > 0 ? (asset.totalValue / maxTotalValue) * 100 : 0;

            // Format to reasonable decimals
            const valFormatted = asset.totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            const priceFormatted = asset.prcStr.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

            // Risk Badge HTML
            let riskClass = '';
            let riskText = '';

            if (asset.color === 'low') {
                riskClass = 'risk-low';
                riskText = 'LOW';
            } else if (asset.color === 'medium') {
                riskClass = 'risk-medium';
                riskText = 'MED';
            } else if (asset.color === 'high') {
                riskClass = 'risk-high';
                riskText = 'HIGH';
            } else {
                riskClass = 'risk-low';
                riskText = 'LOW';
            }

            const riskBadgeHtml = `<span class="risk-badge ${riskClass}">${riskText}</span>`;

            tr.innerHTML = `
                <td class="asset-name-bold">${asset.name.toUpperCase()}</td>
                <td>${asset.category}</td>
                <td class="amount-bold">
                    <div class="amount-container">
                        <span class="amount-text">${asset.amount || '0'}</span>
                        <div class="amount-bar-bg">
                            <div class="amount-bar-fill" title="Valued at: ${valFormatted}" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                </td>
                <td>${priceFormatted}</td>
                <td>${asset.circSupply ? Number(asset.circSupply).toLocaleString('en-US') : '∞'}</td>
                <td>${asset.maxSupply ? Number(asset.maxSupply).toLocaleString('en-US') : '∞'}</td>
                <td>${riskBadgeHtml}</td>
                <td class="date-text">${asset.lastEdit || '-'}</td>
                <td>
                    <div class="row-actions">
                        <button class="icon-btn edit" onclick="editAsset('${asset.id}')" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="icon-btn delete" onclick="deleteAsset('${asset.id}')" title="Delete">
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
    });

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
                    const importedData = JSON.parse(e.target.result);
                    if (Array.isArray(importedData)) {
                        assets = importedData;
                        saveAssets();
                        renderTable(searchInput.value);
                        showToast('JSON Portfolio imported successfully.');
                    } else {
                        showToast('Invalid JSON file format.', true);
                    }
                } catch (err) {
                    showToast('JSON File read error.', true);
                }
            };
        } else if (file.name.toLowerCase().endsWith('.csv')) {
            reader.onload = function (e) {
                try {
                    const csvText = e.target.result;
                    const importedData = parseCSV(csvText);

                    if (importedData && importedData.length > 0) {
                        assets = importedData;
                        saveAssets();
                        renderTable(searchInput.value);
                        showToast('CSV Portfolio imported successfully.');
                    } else {
                        showToast('Invalid or empty CSV file.', true);
                    }
                } catch (err) {
                    showToast('CSV File read error.', true);
                }
            };
        } else {
            showToast('Unsupported file type.', true);
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

        const dataStr = JSON.stringify(assets, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        triggerDownload(dataUri, 'crypto_portfolio.json');
        showToast('JSON backup file is downloading.');
    });

    // Action Events - CSV Export
    exportCsvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (assets.length === 0) {
            showToast('No assets found to export!', true);
            return;
        }

        const csvContent = convertToCSV(assets);
        const dataUri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csvContent);

        triggerDownload(dataUri, 'crypto_portfolio.csv');
        showToast('CSV backup file is downloading.');
    });
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

// CSV Conversion Utilities
function convertToCSV(dataArr) {
    const headers = ['ID', 'Asset', 'Category', 'Amount', 'Price', 'Circulating Supply', 'Max Supply', 'Color', 'Last Edit'];
    let csvRows = [];

    // Add headers
    csvRows.push(headers.join(','));

    // Add data
    for (const asset of dataArr) {
        const row = [
            escapeCSV(asset.id),
            escapeCSV(asset.name),
            escapeCSV(asset.category),
            escapeCSV(asset.amount || '0'),
            escapeCSV(asset.price || '0'),
            escapeCSV(asset.circSupply || ''),
            escapeCSV(asset.maxSupply || ''),
            escapeCSV(asset.color || 'default'),
            escapeCSV(asset.lastEdit)
        ];
        csvRows.push(row.join(','));
    }

    return csvRows.join('\n');
}

function escapeCSV(str) {
    if (str === null || str === undefined) return '';
    const stringVal = String(str);
    if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
    }
    return stringVal;
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    if (lines.length < 2) return []; // Needs at least header and 1 data row

    const result = [];
    // Assuming identical header order to convertToCSV:
    // ['ID', 'Asset', 'Category', 'Amount', 'Price', 'Circulating Supply', 'Max Supply', 'Color', 'Last Edit']

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Basic regex for CSV splitting (handles quotes)
        // Note: For complex CSVs, a dedicated library like Papaparse is better, 
        // but this regex works for standard cases.
        const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

        if (values && values.length >= 2) {
            // Clean quotes from values
            const cleanVals = values.map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"'));

            result.push({
                id: cleanVals[0] || Date.now().toString() + i,
                name: cleanVals[1] || 'Unknown',
                category: cleanVals[2] || 'Uncategorized',
                amount: cleanVals[3] || '0',
                price: cleanVals[4] || '0',
                circSupply: cleanVals[5] || '',
                maxSupply: cleanVals[6] || '',
                color: cleanVals[7] || 'default',
                lastEdit: cleanVals[8] || getCurrentDateFormatted()
            });
        }
    }
    return result;
}

// Save Asset (Add new or Update existing)
function saveFormAsset() {
    const nameStr = assetNameInput.value.trim().toUpperCase();
    const catStr = categoryInput.value.trim();
    const amtStr = amountInput.value.trim();
    const priceStr = priceInput.value.trim();
    const circStr = circSupplyInput.value.trim();
    const maxStr = maxSupplyInput.value.trim();

    // Strict Validation
    if (!nameStr || !catStr || !amtStr || !priceStr) {
        showToast('Please fill all required fields.', true);
        return;
    }

    const amtNum = parseFloat(amtStr);
    const priceNum = parseFloat(priceStr);

    if (isNaN(amtNum) || amtNum < 0 || isNaN(priceNum) || priceNum < 0) {
        showToast('Amount and Price must be valid positive numbers.', true);
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
        category: catStr,
        amount: amtStr,
        price: priceStr,
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
    categoryInput.value = asset.category;
    amountInput.value = asset.amount || '';
    priceInput.value = asset.price || '';
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
        if (themeToggle.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('whalestack-theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('whalestack-theme', 'dark');
        }
    });
}

setupThemeToggle();
