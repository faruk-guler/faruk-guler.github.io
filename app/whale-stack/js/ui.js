// Fallback for broken api logos (swaps img src with local whale_logo.jpg)
window.handleLogoError = function(imgElement) {
    imgElement.onerror = null;
    imgElement.src = 'img/404.png';
};

// Set modal logo dynamically
window.setModalLogo = function(imageSrc) {
    const logoContainer = document.getElementById('coinApiInfo');
    if (!logoContainer) return;
    
    // Remove previous logo element (whether img or span)
    const oldLogo = document.getElementById('infoCoinLogo');
    if (oldLogo) {
        oldLogo.remove();
    }
    
    const img = document.createElement('img');
    img.id = 'infoCoinLogo';
    img.className = 'info-coin-logo';
    img.alt = 'logo';
    img.src = imageSrc || 'img/404.png';
    img.onerror = function() { handleLogoError(this); };
    logoContainer.insertBefore(img, document.getElementById('infoCoinText'));
};

// DOM Elements
const assetForm = document.getElementById('assetForm');
const assetNameInput = document.getElementById('assetName');
const amountInput = document.getElementById('amount');
const priceInput = document.getElementById('price');
const currentPriceInput = document.getElementById('currentPrice');
const rowColorInput = document.getElementById('rowColor');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const tableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');

const watchlistInput = document.getElementById('watchlistInput');
const addWatchlistBtn = document.getElementById('addWatchlistBtn');
const watchlistTableBody = document.getElementById('watchlistTableBody');
const watchlistEmptyState = document.getElementById('watchlistEmptyState');

// Summary Element DOMs
const summaryTotalValue = document.getElementById('summaryTotalValue');
const summaryTotalPL = document.getElementById('summaryTotalPL');
const totalPLContainer = document.getElementById('totalPLContainer');

// Dropdown Action Elements
const importBtn = document.getElementById('importBtn');
const fileInput = document.getElementById('fileInput');
const exportJsonBtn = document.getElementById('exportJsonBtn');

// Modal Elements
const addAssetModal = document.getElementById('addAssetModal');
const openAddAssetModalBtn = document.getElementById('openAddAssetModalBtn');
const closeAddAssetModal = document.getElementById('closeAddAssetModal');

const toastIcon = document.getElementById('toastIcon');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Set refresh/sync button loading state
function setRefreshButtonLoading(isLoading) {
    const btn = document.getElementById('refreshPricesBtn');
    const icon = document.getElementById('refreshIcon');
    if (!btn || !icon) return;

    if (isLoading) {
        btn.disabled = true;
        icon.classList.add('fa-spin');
    } else {
        btn.disabled = false;
        icon.classList.remove('fa-spin');
    }
}

// Show Suggestion Dropdown
function showSuggestions(val) {
    const list = document.getElementById('coinSuggestList');
    if (!list) return;
    list.innerHTML = '';
    
    if (val.length < 1) {
        list.classList.add('hidden');
        return;
    }

    const query = val.toLowerCase();
    
    const matches = apiCoins.filter(c => 
        c.symbol.toLowerCase().includes(query) || 
        c.name.toLowerCase().includes(query)
    ).sort((a, b) => {
        const aSym = a.symbol.toLowerCase();
        const bSym = b.symbol.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        // 1. Exact symbol match
        if (aSym === query && bSym !== query) return -1;
        if (bSym === query && aSym !== query) return 1;
        
        // 2. Exact name match
        if (aName === query && bName !== query) return -1;
        if (bName === query && aName !== query) return 1;

        // 3. Symbol starts with query
        if (aSym.startsWith(query) && !bSym.startsWith(query)) return -1;
        if (bSym.startsWith(query) && !aSym.startsWith(query)) return 1;

        // 4. Name starts with query
        if (aName.startsWith(query) && !bName.startsWith(query)) return -1;
        if (bName.startsWith(query) && !aName.startsWith(query)) return 1;

        // 5. Shorter symbol length (e.g. 'ETH' over 'WSTETH')
        return aSym.length - bSym.length;
    }).slice(0, 5);

    if (matches.length === 0) {
        list.classList.add('hidden');
        return;
    }

    // Hide the exact match info box while the user is actively seeing suggestions
    document.getElementById('coinApiInfo').classList.add('hidden');

    matches.forEach(coin => {
        const div = document.createElement('div');
        div.className = 'suggest-item';
        const logoUrl = coin.image || 'img/404.png';
        const logoHtml = `<img src="${logoUrl}" alt="${coin.name}" class="suggest-logo" onerror="handleLogoError(this)">`;
        div.innerHTML = `
            ${logoHtml}
            <span class="suggest-symbol">${coin.symbol.toUpperCase()}</span>
            <span class="suggest-name">${coin.name}</span>
        `;
        div.addEventListener('click', async () => {
            assetNameInput.value = coin.symbol.toUpperCase();
            selectedApiCoin = coin;
            
            setModalLogo(coin.image);
            document.getElementById('infoCoinText').textContent = `${coin.symbol.toUpperCase()} - ${coin.name} (Loading Pyth price...)`;
            document.getElementById('coinApiInfo').classList.remove('hidden');
            document.getElementById('manualFields').classList.add('hidden');
            
            list.classList.add('hidden');

            try {
                const res = await fetch(`https://hermes.pyth.network/v2/updates/price/latest?ids[]=${coin.id}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json && json.parsed && json.parsed[0]) {
                        const item = json.parsed[0];
                        const priceVal = parseFloat(item.price.price) * Math.pow(10, item.price.expo);
                        pythPrices[coin.id] = priceVal;
                        document.getElementById('infoCoinText').textContent = `${coin.symbol.toUpperCase()} - ${coin.name} (Live Pyth: $${formatRawPrice(priceVal)})`;
                    }
                }
            } catch(err) {
                console.error(err);
                document.getElementById('infoCoinText').textContent = `${coin.symbol.toUpperCase()} - ${coin.name}`;
            }
        });
        list.appendChild(div);
    });

    list.classList.remove('hidden');
}

// Render Table
function renderTable(filterText = '') {
    tableBody.innerHTML = '';

    // Set table headers to USD
    const headers = document.querySelectorAll('#portfolioTable th');
    if (headers.length >= 5) {
        headers[2].textContent = 'Avg Cost ($)';
        headers[3].textContent = 'Current Price ($)';
        headers[4].textContent = 'Total Value ($)';
    }

    if (!Array.isArray(assets) || assets.length === 0) {
        emptyState.classList.remove('hidden');
        const portfolioTableResponsive = document.querySelector('#portfolioTable')?.closest('.table-responsive');
        if (portfolioTableResponsive) portfolioTableResponsive.classList.add('hidden');

        // Reset Summaries
        if (summaryTotalValue) summaryTotalValue.textContent = '$0.00';
        if (summaryTotalPL) summaryTotalPL.textContent = '$0.00';
        if (totalPLContainer) totalPLContainer.classList.add('hidden');
        return;
    }

    // Process all assets for portfolio metrics and values (independent of search filtering)
    let absoluteTotalVal = 0;
    let absoluteBuyVal = 0;

    const allProcessed = assets.map((a, index) => {
        const amt = parseFloat(a.amount) || 0;
        const prc = parseFloat(a.price) || 0;
        
        let curPrc = 0;
        let circSupply = '';
        let maxSupply = '';
        let logoUrl = '';
        let coinFullName = a.name;

        // Resolve details from API or local fallback
        let liveCoin = null;
        if (a.coingeckoId) {
            liveCoin = apiCoins.find(c => c.id === a.coingeckoId);
        } else {
            liveCoin = apiCoins.find(c => c.symbol.toLowerCase() === a.name.toLowerCase());
        }

        if (liveCoin) {
            curPrc = pythPrices[liveCoin.id] || liveCoin.current_price;
            circSupply = liveCoin.circulating_supply;
            maxSupply = liveCoin.max_supply;
            logoUrl = liveCoin.image;
            coinFullName = liveCoin.name;
        } else {
            curPrc = parseFloat(a.currentPrice) || 0;
            circSupply = a.circSupply || '';
            maxSupply = a.maxSupply || '';
            logoUrl = '';
        }

        const tVal = amt * curPrc;
        const buyVal = amt * prc;

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
            id: a.id || (Date.now() + index).toString(),
            name: a.name || 'UNKNOWN',
            fullName: coinFullName,
            totalValue: tVal,
            amtStr: amt,
            prcStr: prc,
            curPrcStr: curPrc,
            circSupply: circSupply,
            maxSupply: maxSupply,
            logoUrl: logoUrl,
            profitLoss: profitLoss,
            profitLossPercent: profitLossPercent,
            originalIndex: index
        };
    });

    // Update Summaries based on entire portfolio
    if (summaryTotalValue) {
        summaryTotalValue.textContent = formatPrice(absoluteTotalVal);
    }

    if (summaryTotalPL && totalPLContainer) {
        const totalPLAmount = absoluteTotalVal - absoluteBuyVal;
        const totalMultiplier = absoluteBuyVal > 0 ? (absoluteTotalVal / absoluteBuyVal) : 0;

        const plFormatted = formatPrice(totalPLAmount, 'always');
        let plMultiplierFormatted = '0.00x';
        if (absoluteBuyVal === 0 && absoluteTotalVal > 0) {
            plMultiplierFormatted = '∞x';
        } else if (absoluteBuyVal > 0) {
            plMultiplierFormatted = parseFloat(totalMultiplier.toFixed(2)) + 'x';
        }

        summaryTotalPL.textContent = `${plFormatted} (${plMultiplierFormatted})`;
        totalPLContainer.classList.remove('hidden');

        if (totalPLAmount >= 0) {
            summaryTotalPL.className = 'balance-value profit-text';
        } else {
            summaryTotalPL.className = 'balance-value loss-text';
        }
    }

    // Filter assets for display
    const text = filterText.toLowerCase().trim();
    const filteredAssets = allProcessed.filter(asset => {
        return asset.name.toLowerCase().includes(text) ||
               (asset.fullName && asset.fullName.toLowerCase().includes(text));
    });

    if (filteredAssets.length === 0) {
        emptyState.classList.remove('hidden');
        const portfolioTableResponsive = document.querySelector('#portfolioTable')?.closest('.table-responsive');
        if (portfolioTableResponsive) portfolioTableResponsive.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        const portfolioTableResponsive = document.querySelector('#portfolioTable')?.closest('.table-responsive');
        if (portfolioTableResponsive) portfolioTableResponsive.classList.remove('hidden');

        // Sort by total value, highest first
        filteredAssets.sort((a, b) => b.totalValue - a.totalValue);

        const maxTotalValue = Math.max(...allProcessed.map(a => a.totalValue));

        filteredAssets.forEach(asset => {
            const tr = document.createElement('tr');
            tr.className = `row-risk-${asset.color || 'low'}`;

            const percentage = maxTotalValue > 0 ? (asset.totalValue / maxTotalValue) * 100 : 0;

            const valFormatted = formatPrice(asset.totalValue);
            const priceFormatted = formatPrice(asset.prcStr);
            const currentPriceFormatted = formatPrice(asset.curPrcStr);

            const plFormatted = formatPrice(asset.profitLoss, 'always');
            let plMultiplierFormatted = '0.00x';
            if (asset.price === 0) {
                plMultiplierFormatted = 'Airdrop';
            } else {
                const multiplier = asset.currentPrice / asset.price;
                plMultiplierFormatted = parseFloat(multiplier.toFixed(2)) + 'x';
            }
            const plClass = asset.profitLoss >= 0 ? 'profit-text' : 'loss-text';

            let riskClass = '';
            let riskText = '';
            if (asset.color === 'low') { riskClass = 'risk-low'; riskText = 'LOW'; }
            else if (asset.color === 'medium') { riskClass = 'risk-medium'; riskText = 'MED'; }
            else if (asset.color === 'high') { riskClass = 'risk-high'; riskText = 'HIGH'; }
            else { riskClass = 'risk-low'; riskText = 'LOW'; }

            const logoUrl = asset.logoUrl || 'img/404.png';
            const logoHtml = `<img src="${logoUrl}" alt="${asset.name}" class="coin-table-logo" onerror="handleLogoError(this)">`;

            // XSS Safe Column Rendering
            tr.innerHTML = `
                <td>
                    <div class="coin-cell">
                        ${logoHtml}
                        <div class="coin-info-cell">
                            <span class="asset-name-bold">${escapeHTML(asset.name.toUpperCase())}</span>
                            <span class="asset-fullname">${escapeHTML(asset.fullName)}</span>
                        </div>
                    </div>
                </td>
                <td class="font-mono">${currentPriceFormatted}</td>
                <td>${priceFormatted}</td>
                <td class="amount-bold">
                    <div class="amount-container">
                        <span class="amount-text">${escapeHTML(String(asset.amount || '0'))}</span>
                        <div class="amount-bar-bg">
                            <div class="amount-bar-fill" title="Valued at: ${valFormatted}" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                </td>
                <td class="font-bold highlight-text font-mono">${valFormatted}</td>
                <td class="${plClass} font-mono">${plFormatted} <br><small>(${plMultiplierFormatted})</small></td>
                <td><span class="risk-badge ${riskClass}">${riskText}</span></td>
                <td>
                    <div class="row-actions">
                        <button class="icon-btn edit" onclick="editAsset('${escapeHTML(asset.id)}')" title="Edit" aria-label="Edit ${escapeHTML(asset.name)}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="icon-btn watchlist-move" onclick="moveToWatchlist('${escapeHTML(asset.id)}')" title="Move to My Radar" aria-label="Move ${escapeHTML(asset.name)} to My Radar">
                            <i class="fa-solid fa-eye"></i>
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


function updateModalFieldsForDestination(destination) {
    const amountGroup = document.getElementById('amountGroup');
    const priceGroup = document.getElementById('priceGroup');
    const riskGroup = document.getElementById('riskGroup');
    const amountInput = document.getElementById('amount');
    const priceInput = document.getElementById('price');

    // Hide amount, price, risk if adding a new asset (not editing) OR if destination is watchlist
    const shouldHide = (!editingId) || (destination === 'watchlist');

    if (shouldHide) {
        if (amountGroup) amountGroup.classList.add('hidden');
        if (priceGroup) priceGroup.classList.add('hidden');
        if (riskGroup) riskGroup.classList.add('hidden');
        if (amountInput) amountInput.removeAttribute('required');
        if (priceInput) priceInput.removeAttribute('required');
    } else {
        if (amountGroup) amountGroup.classList.remove('hidden');
        if (priceGroup) priceGroup.classList.remove('hidden');
        if (riskGroup) riskGroup.classList.remove('hidden');
    }
}


function updateHeaderPrices() {
    const btcPriceEl = document.getElementById('tickerBtcPrice');
    const ethPriceEl = document.getElementById('tickerEthPrice');
    const btcLogoEl = document.getElementById('tickerBtcLogo');
    const ethLogoEl = document.getElementById('tickerEthLogo');

    const btcCoin = apiCoins.find(c => c.symbol.toLowerCase() === 'btc');
    const ethCoin = apiCoins.find(c => c.symbol.toLowerCase() === 'eth');

    if (btcCoin) {
        if (btcLogoEl && btcLogoEl.src.includes('404.png')) {
            btcLogoEl.src = btcCoin.image || 'img/404.png';
        }
        const btcPrice = pythPrices[btcCoin.id] || btcCoin.current_price;
        if (btcPriceEl && btcPrice) {
            btcPriceEl.textContent = formatPrice(btcPrice);
        }
    }
    if (ethCoin) {
        if (ethLogoEl && ethLogoEl.src.includes('404.png')) {
            ethLogoEl.src = ethCoin.image || 'img/404.png';
        }
        const ethPrice = pythPrices[ethCoin.id] || ethCoin.current_price;
        if (ethPriceEl && ethPrice) {
            ethPriceEl.textContent = formatPrice(ethPrice);
        }
    }
}

// Reset Form — defaults to Portfolio mode (all fields visible)
function resetForm() {
    assetForm.reset();
    editingId = null;
    selectedApiCoin = null;
    submitBtn.textContent = 'Add Asset';
    cancelEditBtn.style.display = 'none';

    // Default destination: Portfolio (all fields visible)
    const destPortfolio = document.getElementById('destPortfolio');
    if (destPortfolio) destPortfolio.checked = true;
    const destLabelPortfolio = document.getElementById('destLabelPortfolio');
    const destLabelWatchlist = document.getElementById('destLabelWatchlist');
    if (destLabelPortfolio) destLabelPortfolio.classList.add('active');
    if (destLabelWatchlist) destLabelWatchlist.classList.remove('active');
    updateModalFieldsForDestination('portfolio');

    document.getElementById('coinApiInfo').classList.add('hidden');
    document.getElementById('manualFields').classList.add('hidden');
    const suggestList = document.getElementById('coinSuggestList');
    if (suggestList) suggestList.classList.add('hidden');

    // Revert form heading inside modal
    const formHeading = document.querySelector('.add-asset-modal-content h2');
    if (formHeading) formHeading.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Add New Asset';
}
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


function renderWatchlist(filterText = '') {
    watchlistTableBody.innerHTML = '';
    
    let filteredWatchlist = watchlist;
    const text = filterText.toLowerCase().trim();
    
    if (text) {
        filteredWatchlist = watchlist.filter(item => {
            const coinMatch = apiCoins.find(c => c.id === item.coingeckoId || c.symbol.toLowerCase() === item.name.toLowerCase());
            const fullName = coinMatch ? coinMatch.name : '';
            return item.name.toLowerCase().includes(text) || fullName.toLowerCase().includes(text);
        });
    }

    if (filteredWatchlist.length === 0) {
        watchlistEmptyState.classList.remove('hidden');
        document.getElementById('watchlistTable').style.display = 'none';
        return;
    }
    
    watchlistEmptyState.classList.add('hidden');
    document.getElementById('watchlistTable').style.display = 'table';

    // Update watchlist header to USD
    const watchlistPriceHeader = document.querySelector('#watchlistTable th:nth-child(2)');
    if (watchlistPriceHeader) {
        watchlistPriceHeader.textContent = 'Current Price ($)';
    }
    
    filteredWatchlist.forEach(item => {
        // Resolve price
        let feedId = item.coingeckoId;
        const liveCoin = apiCoins.find(c => c.id === feedId || c.symbol.toLowerCase() === item.name.toLowerCase());
        if (liveCoin) {
            feedId = liveCoin.id;
        }
        
        let priceVal = pythPrices[feedId];
        if (!priceVal && liveCoin && !liveCoin.isPyth) {
            priceVal = pythPrices[liveCoin.id];
        }
        
        const priceText = priceVal ? formatPrice(priceVal) : 'Loading...';
        
        // Check logo url from apiCoins list
        const coinMatch = apiCoins.find(c => c.symbol.toUpperCase() === item.name.toUpperCase());
        const logoUrl = (coinMatch && coinMatch.image) || 'img/404.png';
        const logoHtml = `<img src="${logoUrl}" alt="${item.name}" class="coin-table-logo" style="width: 20px; height: 20px;" onerror="handleLogoError(this)">`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="asset-info" style="display: flex; align-items: center; gap: 0.5rem;">
                    ${logoHtml}
                    <span class="asset-symbol">${item.name}</span>
                </div>
            </td>
            <td>${priceText}</td>
            <td>
                <div class="row-actions" style="justify-content: center;">
                    <button class="icon-btn portfolio-move" onclick="addWatchlistToPortfolio('${escapeHTML(item.name)}')" title="Move to Portfolio" aria-label="Move ${escapeHTML(item.name)} to portfolio">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="icon-btn delete" onclick="removeFromWatchlist('${escapeHTML(item.id)}')" title="Remove from My Radar" aria-label="Remove ${escapeHTML(item.name)} from watchlist">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        watchlistTableBody.appendChild(tr);
    });
}

/* ============================================================== */
function handleRouting() {
    let hash = window.location.hash || '#watchlist';
    const pages = ['watchlist', 'tools', 'etfs', 'about'];
    
    // Default to watchlist if invalid
    let pageId = hash.substring(1);
    if (!pages.includes(pageId)) {
        pageId = 'watchlist';
        hash = '#watchlist';
    }

    // Hide all pages, remove active from links
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

    // Show active page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Highlight active link
    const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    // If ETFs page is opened, trigger data refresh if functions exist
    if (pageId === 'etfs') {
        if (typeof window.fetchEtfPrices === 'function') window.fetchEtfPrices();
        if (typeof window.fetchFarsideFlows === 'function') window.fetchFarsideFlows();
    }
}

// Inline Tool Viewer
/* ============================================================== */
window.openTool = function(url, title) {
    const grid = document.getElementById('toolsGrid');
    const viewer = document.getElementById('toolViewer');
    const iframe = document.getElementById('toolIframe');
    const titleEl = document.getElementById('toolViewerTitle');

    if (!grid || !viewer || !iframe) return;

    // Sync current theme into the iframe URL so tool page reads localStorage correctly
    // (theme is stored in localStorage so the iframe picks it up automatically)
    iframe.src = url;
    if (titleEl) titleEl.textContent = title || '';

    grid.classList.add('hidden');
    viewer.classList.remove('hidden');
};

window.closeTool = function() {
    const grid = document.getElementById('toolsGrid');
    const viewer = document.getElementById('toolViewer');
    const iframe = document.getElementById('toolIframe');

    if (!grid || !viewer || !iframe) return;

    // Unload iframe to stop any running scripts/timers inside it
    iframe.src = '';
    viewer.classList.add('hidden');
    grid.classList.remove('hidden');
};

