// Init
async function init() {
    loadAssets();
    loadWatchlist();
    await loadApiCoins();
    await fetchPythPrices();
    renderTable();
    renderWatchlist();
    setupEventListeners();
    loadThemePreference();
    setupThemeToggle();
    startAutoRefresh();
}

// Start auto refresh of prices every 15 seconds (only when tab is active to save bandwidth)
function startAutoRefresh() {
    stopAutoRefresh();
    priceRefreshInterval = setInterval(async () => {
        if (document.visibilityState === 'visible') {
            console.log('Auto-refreshing portfolio prices from Pyth...');
            await fetchPythPrices();
            renderTable(searchInput.value);
            renderWatchlist();
        }
    }, 15000);
}

function stopAutoRefresh() {
    if (priceRefreshInterval) {
        clearInterval(priceRefreshInterval);
        priceRefreshInterval = null;
    }
}

// Listen to tab visibility to save data on restricted internet
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        startAutoRefresh();
    } else {
        stopAutoRefresh();
    }
});

// Update modal fields dynamically as symbol input changes
async function updateFormFieldsOnSymbolInput(symbolText) {
    const term = symbolText.trim().toLowerCase();
    if (!term) {
        document.getElementById('coinApiInfo').classList.add('hidden');
        document.getElementById('manualFields').classList.add('hidden');
        selectedApiCoin = null;
        return;
    }

    const match = apiCoins.find(c => c.symbol.toLowerCase() === term || c.name.toLowerCase() === term);
    if (match) {
        selectedApiCoin = match;
        setModalLogo(match.image);
        document.getElementById('infoCoinText').textContent = `${match.symbol.toUpperCase()} - ${match.name} (Loading Pyth price...)`;
        document.getElementById('coinApiInfo').classList.remove('hidden');
        document.getElementById('manualFields').classList.add('hidden');
        
        try {
            const res = await fetch(`https://hermes.pyth.network/v2/updates/price/latest?ids[]=${match.id}`);
            if (res.ok) {
                const json = await res.json();
                if (json && json.parsed && json.parsed[0]) {
                    const item = json.parsed[0];
                    const priceVal = parseFloat(item.price.price) * Math.pow(10, item.price.expo);
                    pythPrices[match.id] = priceVal;
                    document.getElementById('infoCoinText').textContent = `${match.symbol.toUpperCase()} - ${match.name} (Live Pyth: $${formatRawPrice(priceVal)})`;
                }
            }
        } catch(err) {
            console.error(err);
            document.getElementById('infoCoinText').textContent = `${match.symbol.toUpperCase()} - ${match.name}`;
        }

        document.getElementById('currentPrice').value = '';
    } else {
        selectedApiCoin = null;
        document.getElementById('coinApiInfo').classList.add('hidden');
        // Only show manual fields when EDITING an existing manual asset
        // When adding new, keep manual fields hidden — user can edit after adding
        if (editingId) {
            document.getElementById('manualFields').classList.remove('hidden');
        } else {
            document.getElementById('manualFields').classList.add('hidden');
        }
    }
}
// Setup Event Listeners

function setupEventListeners() {
    // Destination segmented toggle listeners
    const destPortfolio = document.getElementById('destPortfolio');
    const destWatchlist = document.getElementById('destWatchlist');
    const destLabelPortfolio = document.getElementById('destLabelPortfolio');
    const destLabelWatchlist = document.getElementById('destLabelWatchlist');

    if (destPortfolio && destWatchlist) {
        destPortfolio.addEventListener('change', () => {
            if (destLabelPortfolio) destLabelPortfolio.classList.add('active');
            if (destLabelWatchlist) destLabelWatchlist.classList.remove('active');
            updateModalFieldsForDestination('portfolio');
            if (submitBtn && !submitBtn.textContent.includes('Save')) submitBtn.textContent = 'Add to Portfolio';
        });
        destWatchlist.addEventListener('change', () => {
            if (destLabelPortfolio) destLabelPortfolio.classList.remove('active');
            if (destLabelWatchlist) destLabelWatchlist.classList.add('active');
            updateModalFieldsForDestination('watchlist');
            if (submitBtn && !submitBtn.textContent.includes('Save')) submitBtn.textContent = 'Add to Radar';
        });
    }

    // Form Submit
    assetForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveFormAsset();
    });

    cancelEditBtn.addEventListener('click', function () {
        resetForm();
        addAssetModal.style.display = 'none';
    });

    // TRY conversion logic removed. Only USD is used.

    searchInput.addEventListener('input', function (e) {
        renderTable(e.target.value);
        renderWatchlist(e.target.value);
    });

    // Watchlist Event Listeners
    if (addWatchlistBtn) {
        addWatchlistBtn.addEventListener('click', () => {
            addToWatchlist();
        });
    }

    if (watchlistInput) {
        watchlistInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addToWatchlist();
            }
        });
    }

    const watchlistHeaderBtn = document.getElementById('watchlistHeaderBtn');
    if (watchlistHeaderBtn) {
        watchlistHeaderBtn.addEventListener('click', () => {
            const dividerEl = document.querySelector('.section-divider');
            if (dividerEl) {
                dividerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                const panel = dividerEl.closest('.glass-panel');
                if (panel) {
                    panel.classList.add('glow-active');
                    setTimeout(() => {
                        panel.classList.remove('glow-active');
                    }, 1500);
                }
            }
        });
    }

    // Refresh Button Event Listener
    const refreshPricesBtn = document.getElementById('refreshPricesBtn');
    if (refreshPricesBtn) {
        refreshPricesBtn.addEventListener('click', async () => {
            await loadApiCoins(true);
            await fetchPythPrices();
            renderTable(searchInput.value);
        });
    }

    // Asset Name suggestions and autocomplete logic
    assetNameInput.addEventListener('input', function (e) {
        const val = e.target.value;
        updateFormFieldsOnSymbolInput(val);
        showSuggestions(val);
    });

    // Close suggestions list on clicking outside
    document.addEventListener('click', function(e) {
        const list = document.getElementById('coinSuggestList');
        if (list && !list.contains(e.target) && e.target !== assetNameInput) {
            list.classList.add('hidden');
            if (selectedApiCoin) {
                document.getElementById('coinApiInfo').classList.remove('hidden');
            }
        }
    });

    // Add Asset Modal Listeners
    if (openAddAssetModalBtn) {
        openAddAssetModalBtn.addEventListener('click', () => {
            resetForm(); // already defaults to Portfolio mode
            addAssetModal.style.display = 'flex';
        });
    }

    if (closeAddAssetModal) {
        closeAddAssetModal.addEventListener('click', () => {
            addAssetModal.style.display = 'none';
            resetForm();
        });
    }

    // window click listener for closing addAssetModal
    window.addEventListener('click', (e) => {
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
                    let importedData = JSON.parse(e.target.result);
                    let lastEditTime = null;
                    let importedWatchlist = null;

                    // Handle new format { assets: [], portfolioLastEdit: ... } or old format [ ... ]
                    if (!Array.isArray(importedData) && importedData && importedData.assets) {
                        if (importedData.portfolioLastEdit) {
                            lastEditTime = importedData.portfolioLastEdit;
                        }
                        if (importedData.watchlist && Array.isArray(importedData.watchlist)) {
                            importedWatchlist = importedData.watchlist;
                        }
                        importedData = importedData.assets;
                    }

                    const validated = validateAssets(importedData);
                    if (validated) {
                        assets = validated;
                        if (importedWatchlist) {
                            watchlist = importedWatchlist;
                            saveWatchlist();
                            renderWatchlist();
                        }
                        if (lastEditTime) {
                            localStorage.setItem('portfolioLastUpdated', lastEditTime);
                        } else {
                            updateGlobalTimestamp();
                        }
                        saveAssets();
                        renderTable(searchInput.value);
                        updateGlobalTimestamp(localStorage.getItem('portfolioLastUpdated')); // Refresh UI timestamp
                        showToast('JSON Portfolio and Watchlist imported successfully.');
                    } else {
                        showToast('Invalid JSON file format or no valid assets.', true);
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
        if (assets.length === 0 && watchlist.length === 0) {
            showToast('No assets found to export!', true);
            return;
        }

        // Create export object with global timestamp
        const exportObj = {
            assets: assets,
            watchlist: watchlist,
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
// Save Asset (Add new or Update existing)
function saveFormAsset() {
    const nameStr = assetNameInput.value.trim().toUpperCase();
    const isWatchlistSelected = document.getElementById('destWatchlist') ? document.getElementById('destWatchlist').checked : false;

    if (isWatchlistSelected) {
        if (!nameStr) {
            showToast('Please enter a valid symbol.', true);
            return;
        }

        let match = null;
        if (selectedApiCoin) {
            match = selectedApiCoin;
        } else {
            match = apiCoins.find(c => c.symbol.toUpperCase() === nameStr || c.name.toUpperCase() === nameStr);
        }

        const matchId = match ? match.id : '';
        const exists = watchlist.some(w => w.name.toUpperCase() === nameStr);
        if (exists) {
            showToast(`'${nameStr}' is already in My Radar.`, true);
            return;
        }

        const inPortfolio = assets.some(a => a.name.toUpperCase() === nameStr);
        if (inPortfolio) {
            showToast(`'${nameStr}' is already in your portfolio, cannot be added to My Radar.`, true);
            return;
        }

        // Get existing asset info if moving from portfolio
        let oldAssetAmount = '0';
        let oldAssetPrice = '0';
        let oldAssetColor = 'low';
        if (editingId) {
            const oldAsset = assets.find(a => a.id === editingId);
            if (oldAsset) {
                oldAssetAmount = oldAsset.amount;
                oldAssetPrice = oldAsset.price;
                oldAssetColor = oldAsset.color || 'low';
            }
            assets = assets.filter(a => a.id !== editingId);
            saveAssets();
            renderTable(searchInput.value);
        }

        watchlist.push({
            id: String(Date.now()),
            name: nameStr,
            coingeckoId: matchId,
            amount: oldAssetAmount,
            price: oldAssetPrice,
            color: oldAssetColor
        });

        saveWatchlist();
        fetchPythPrices().then(() => renderWatchlist());
        showToast(`'${nameStr}' added to My Radar.`);
        resetForm();
        addAssetModal.style.display = 'none';
        return;
    }

    let amtStr = amountInput.value.trim();
    let priceStr = priceInput.value.trim();

    // Default to '0' if user leaves them blank (allows saving empty assets to track prices)
    if (!amtStr) amtStr = '0';
    if (!priceStr) priceStr = '0';

    // Strict Validation for Name only (since amount/price default to 0)
    if (!nameStr) {
        showToast('Please fill in the Asset Symbol.', true);
        return;
    }

    const amtNum = parseFloat(amtStr);
    const priceNum = parseFloat(priceStr);

    if (isNaN(amtNum) || amtNum < 0 || isNaN(priceNum) || priceNum < 0) {
        showToast('Amount and Avg Cost must be valid positive numbers.', true);
        return;
    }

    const newAsset = {
        name: nameStr,
        amount: amtStr,
        price: priceStr,
        color: rowColorInput.value,
        lastEdit: getCurrentDateFormatted()
    };

    // If it's a manual coin AND editing an existing asset, require currentPrice
    if (!selectedApiCoin) {
        if (editingId) {
            // Editing an existing manual asset — currentPrice is required
            const curPrcStr = document.getElementById('currentPrice').value.trim();
            if (!curPrcStr) {
                showToast('You must enter a Current Price for non-API coins.', true);
                return;
            }
            const curPrcNum = parseFloat(curPrcStr);
            if (isNaN(curPrcNum) || curPrcNum < 0) {
                showToast('Current Price must be a valid positive number.', true);
                return;
            }
            newAsset.currentPrice = curPrcStr;
        } else {
            // Quick-add: no API coin selected, mark as manual with empty current price for now
            newAsset.currentPrice = '';
        }
        newAsset.isManual = true;
    } else {
        newAsset.isManual = false;
        newAsset.coingeckoId = selectedApiCoin.id;
    }

    if (editingId) {
        // Update
        const index = assets.findIndex(a => a.id === editingId);
        if (index !== -1) {
            newAsset.id = editingId;
            assets[index] = newAsset;
            showToast(`${newAsset.name} successfully updated.`);
        }
    } else {
        // Add
        newAsset.id = Date.now().toString();
        assets.push(newAsset);
        showToast(`${newAsset.name} added to portfolio.`);
    }

    // Remove from watchlist if present
    const watchIdx = watchlist.findIndex(w => w.name.toUpperCase() === newAsset.name.toUpperCase());
    if (watchIdx !== -1) {
        watchlist.splice(watchIdx, 1);
        saveWatchlist();
        renderWatchlist();
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

    // Pre-select Portfolio
    const destPortfolio = document.getElementById('destPortfolio');
    if (destPortfolio) destPortfolio.checked = true;
    const destLabelPortfolio = document.getElementById('destLabelPortfolio');
    const destLabelWatchlist = document.getElementById('destLabelWatchlist');
    if (destLabelPortfolio) destLabelPortfolio.classList.add('active');
    if (destLabelWatchlist) destLabelWatchlist.classList.remove('active');
    updateModalFieldsForDestination('portfolio');

    assetNameInput.value = asset.name;
    amountInput.value = asset.amount || '';
    priceInput.value = asset.price || '';
    rowColorInput.value = asset.color || 'low';

    // Set selected API coin if exists
    let liveCoin = null;
    if (asset.coingeckoId) {
        liveCoin = apiCoins.find(c => c.id === asset.coingeckoId);
    } else {
        liveCoin = apiCoins.find(c => c.symbol.toLowerCase() === asset.name.toLowerCase());
    }

    if (liveCoin) {
        selectedApiCoin = liveCoin;
        setModalLogo(liveCoin.image);
        
        const priceVal = pythPrices[liveCoin.id] || 0;
        const priceText = priceVal > 0 ? ` (Live Pyth: $${formatRawPrice(priceVal)})` : ' (Loading live price...)';
        document.getElementById('infoCoinText').textContent = `${liveCoin.symbol.toUpperCase()} - ${liveCoin.name}${priceText}`;
        document.getElementById('coinApiInfo').classList.remove('hidden');
        document.getElementById('manualFields').classList.add('hidden');
        
        document.getElementById('currentPrice').value = '';
        
        if (priceVal === 0) {
            fetch(`https://hermes.pyth.network/v2/updates/price/latest?ids[]=${liveCoin.id}`)
                .then(res => res.json())
                .then(json => {
                    if (json && json.parsed && json.parsed[0]) {
                        const item = json.parsed[0];
                        const val = parseFloat(item.price.price) * Math.pow(10, item.price.expo);
                        pythPrices[liveCoin.id] = val;
                        document.getElementById('infoCoinText').textContent = `${liveCoin.symbol.toUpperCase()} - ${liveCoin.name} (Live Pyth: $${formatRawPrice(val)})`;
                    }
                })
                .catch(err => console.error(err));
        }
    } else {
        selectedApiCoin = null;
        document.getElementById('coinApiInfo').classList.add('hidden');
        document.getElementById('manualFields').classList.remove('hidden');
        
        document.getElementById('currentPrice').value = asset.currentPrice || '';
    }

    submitBtn.textContent = 'Save Changes';
    cancelEditBtn.style.display = 'inline-block';

    // Update form section heading visually
    const formHeading = document.querySelector('.add-asset-modal-content h2');
    if (formHeading) formHeading.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Asset';

    // Open the modal instead of scrolling
    addAssetModal.style.display = 'flex';
};

window.deleteAsset = function (id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) {
        showToast('Asset not found.', true);
        return;
    }
    showConfirm(`Delete '${asset.name}' from portfolio?`, () => {
        assets = assets.filter(a => a.id !== id);
        updateGlobalTimestamp();
        saveAssets();
        renderTable(searchInput.value);
        showToast('Asset deleted.');

        if (editingId === id) {
            resetForm();
        }
    });
};

// Move asset from Portfolio to My Radar
window.moveToWatchlist = function(id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) {
        showToast('Asset not found.', true);
        return;
    }

    // Check if already in My Radar
    const exists = watchlist.some(w => w.name.toUpperCase() === asset.name.toUpperCase());
    if (exists) {
        showToast(`'${asset.name}' is already in My Radar.`, true);
        return;
    }

    // Confirm before moving
    showConfirm(`Move '${asset.name}' to My Radar? It will be removed from your portfolio.`, () => {
        // Resolve coingeckoId if possible
        let coingeckoId = asset.coingeckoId || '';
        if (!coingeckoId) {
            const liveCoin = apiCoins.find(c => c.symbol.toLowerCase() === asset.name.toLowerCase());
            if (liveCoin) coingeckoId = liveCoin.id;
        }

        // Add to My Radar
        watchlist.push({
            id: String(Date.now()),
            name: asset.name.toUpperCase(),
            coingeckoId: coingeckoId,
            amount: asset.amount,
            price: asset.price,
            color: asset.color || 'low'
        });

        // Remove from portfolio
        assets = assets.filter(a => a.id !== id);

        updateGlobalTimestamp();
        saveAssets();
        saveWatchlist();

        renderTable(searchInput.value);
        renderWatchlist();

        showToast(`'${asset.name}' moved to My Radar.`);
    });
};
// Dropdown Logic
const dataMenuBtn = document.getElementById('dataMenuBtn');
const dataDropdownMenu = document.getElementById('dataDropdownMenu');

if (dataMenuBtn && dataDropdownMenu) {
    dataMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dataDropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dataDropdownMenu.contains(e.target) && !dataMenuBtn.contains(e.target)) {
            dataDropdownMenu.classList.remove('show');
        }
    });
}

// Watchlist Logic
window.addToWatchlist = async function() {
    if (!watchlistInput) return;
    const symbolText = watchlistInput.value.trim().toUpperCase();
    if (!symbolText) {
        showToast('Please enter a valid symbol.', true);
        return;
    }

    // Try to find the coin in apiCoins
    const match = apiCoins.find(c => c.symbol.toUpperCase() === symbolText || c.name.toUpperCase() === symbolText);
    if (!match) {
        showToast(`'${symbolText}' not found in API.`, true);
        return;
    }

    // Check if already in portfolio (main assets)
    const inPortfolio = assets.some(a => a.name.toUpperCase() === match.symbol.toUpperCase());
    if (inPortfolio) {
        showToast(`'${match.symbol.toUpperCase()}' is already in your portfolio, cannot be added to My Radar.`, true);
        watchlistInput.value = '';
        return;
    }

    // Check if already in watchlist
    const exists = watchlist.some(w => w.coingeckoId === match.id);
    if (exists) {
        showToast(`'${match.symbol.toUpperCase()}' is already in My Radar.`, true);
        watchlistInput.value = '';
        return;
    }

    // Add to watchlist (set selectedApiCoin for consistency)
    watchlist.push({
        id: String(Date.now()),
        name: match.symbol.toUpperCase(),
        coingeckoId: match.id
    });

    saveWatchlist();
    watchlistInput.value = '';
    
    // Fetch prices and render
    showToast(`'${match.symbol.toUpperCase()}' added to My Radar.`);
    await fetchPythPrices();
    renderWatchlist();
};

window.removeFromWatchlist = function(id) {
    const watchItem = watchlist.find(w => w.id === id);
    if (!watchItem) return;

    showConfirm(`Delete '${watchItem.name}' from My Radar?`, () => {
        watchlist = watchlist.filter(w => w.id !== id);
        saveWatchlist();
        renderWatchlist();
        showToast('Asset removed from My Radar.');
    });
};

window.addWatchlistToPortfolio = function(symbol) {
    const watchItem = watchlist.find(w => w.name.toUpperCase() === symbol.toUpperCase());
    if (!watchItem) return;

    // Check if already in portfolio
    const existingAsset = assets.find(a => a.name.toUpperCase() === symbol.toUpperCase());
    if (existingAsset) {
        showToast(`'${symbol.toUpperCase()}' is already in your portfolio.`, true);
        return;
    }

    showConfirm(`Move '${symbol.toUpperCase()}' to Portfolio? It will be removed from My Radar.`, () => {
        // Remove from watchlist
        watchlist = watchlist.filter(w => w.name.toUpperCase() !== symbol.toUpperCase());
        saveWatchlist();

        // Add to portfolio instantly
        const newAsset = {
            id: String(Date.now()),
            name: symbol.toUpperCase(),
            coingeckoId: watchItem.coingeckoId || '',
            amount: watchItem.amount || '0',
            price: watchItem.price || '0',
            color: watchItem.color || 'low',
            lastEdit: getCurrentDateFormatted()
        };

        assets.push(newAsset);
        
        updateGlobalTimestamp();
        saveAssets();
        
        showToast(`'${symbol.toUpperCase()}' moved to Portfolio.`);
        
        // Refresh views and prices
        fetchPythPrices().then(() => {
            renderTable(searchInput.value);
            renderWatchlist();
        });
    });
};
// Start app
init();

// ==============================================================
// SPA Router
window.addEventListener('hashchange', handleRouting);
// Execute once after DOM is ready — avoid double-call on initial load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleRouting);
} else {
    handleRouting();
}

// ==============================================================
