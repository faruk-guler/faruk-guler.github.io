// WhaleStack — Chainlink On-Chain Decentralized Oracle & Dynamic Watchlist

let activeTool = null;
let priceInterval = null;
let isFetching = false;
let isRefreshing = false;

// Fixed Core Feeds (Always fixed & permanent - cannot be removed)
const FIXED_FEEDS = [
    { symbol: 'BTC', name: 'Bitcoin', address: '0xF4030086522a5beEA4988f8ca5B36dbC97BeE88c', icon: 'fa-brands fa-bitcoin', color: '#f7931a' },
    { symbol: 'ETH', name: 'Ethereum', address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', icon: 'fa-brands fa-ethereum', color: '#627eea' }
];

// Resilient Public Ethereum RPC Endpoints (No API Key Required, Open CORS)
const PUBLIC_RPCS = [
    'https://1rpc.io/eth',
    'https://gateway.tenderly.co/public/mainnet',
    'https://eth.merkle.io'
];

// Price Formatter
function formatPrice(num) {
    if (typeof num !== 'number' || isNaN(num) || num <= 0) return '$0.00';
    if (num < 0.01) {
        return '$' + num.toFixed(6);
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: num >= 1000 ? 2 : 4
    }).format(num);
}

// User Custom Watchlist Management (Stored in localStorage)
function getCustomCoins() {
    try {
        const stored = localStorage.getItem('whalestack_custom_coins');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveCustomCoins(coins) {
    try {
        localStorage.setItem('whalestack_custom_coins', JSON.stringify(coins));
    } catch (e) {}
}

function getAllFeeds() {
    return [...FIXED_FEEDS, ...getCustomCoins()];
}

function getCachedPrices() {
    try {
        return JSON.parse(localStorage.getItem('whalestack_chainlink_prices') || '{}');
    } catch (e) {
        return {};
    }
}

// Render Watchlist Items in Market Sidebar Panel
function renderWatchlistItems() {
    const container = document.getElementById('watchlistItems');
    if (!container) return;

    const customCoins = getCustomCoins();
    const cachedPrices = getCachedPrices();

    let html = '';

    // 1. Render Fixed Feeds (BTC & ETH - Sleek and Minimal)
    FIXED_FEEDS.forEach(coin => {
        const price = cachedPrices[coin.symbol] || (coin.symbol === 'BTC' ? 79640 : 2458);
        html += `
            <div class="watchlist-row fixed-row">
                <div class="watchlist-coin-info">
                    <i class="${coin.icon} watchlist-coin-icon" style="color: ${coin.color}"></i>
                    <div class="watchlist-coin-names">
                        <span class="watchlist-coin-symbol">${coin.symbol}</span>
                        <span class="watchlist-coin-fullname">${coin.name}</span>
                    </div>
                </div>
                <div class="watchlist-coin-right">
                    <span class="watchlist-coin-price" id="dropPrice_${coin.symbol}">${formatPrice(price)}</span>
                </div>
            </div>
        `;
    });

    // 2. Render Custom User Feeds (No logos/icons, clean symbol & name)
    if (customCoins.length > 0) {
        customCoins.forEach(coin => {
            const price = cachedPrices[coin.symbol] || 0;
            html += `
                <div class="watchlist-row custom-row">
                    <div class="watchlist-coin-info">
                        <div class="watchlist-coin-names">
                            <span class="watchlist-coin-symbol">${coin.symbol}</span>
                            <span class="watchlist-coin-fullname">${coin.name || coin.symbol}</span>
                        </div>
                    </div>
                    <div class="watchlist-coin-right">
                        <span class="watchlist-coin-price" id="dropPrice_${coin.symbol}">${formatPrice(price)}</span>
                        <button type="button" onclick="removeCustomCoin('${coin.symbol}')" class="coin-delete-btn" title="Remove ${coin.symbol}">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }

    container.innerHTML = html;
}

// Modal Controls for Adding Coins (Keeps main sidebar ultra-clean)
window.openAddCoinModal = function() {
    const modal = document.getElementById('addCoinModal');
    if (modal) {
        modal.classList.remove('hidden');
        const addrInput = document.getElementById('customAddressInput');
        if (addrInput) setTimeout(() => addrInput.focus(), 150);
    }
};

window.closeAddCoinModal = function() {
    const modal = document.getElementById('addCoinModal');
    if (modal) modal.classList.add('hidden');
};

// ABI decoder for string return (e.g., description() => "SOL / USD")
function decodeAbiString(hex) {
    if (!hex || hex === '0x' || typeof hex !== 'string') return null;
    try {
        const raw = hex.startsWith('0x') ? hex.slice(2) : hex;
        if (raw.length < 128) return null;
        // Word 0 (0..64) is offset (usually 0x20 = 32 bytes)
        // Word 1 (64..128) is string length in bytes
        const len = parseInt(raw.slice(64, 128), 16);
        if (isNaN(len) || len <= 0 || len > 100) return null;
        const strHex = raw.slice(128, 128 + len * 2);
        const matches = strHex.match(/.{1,2}/g);
        if (!matches) return null;
        const str = matches.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        // Return clean printable string without non-printable characters
        const clean = str.replace(/[^\x20-\x7E]/g, '').trim();
        return clean.length >= 2 ? clean : null;
    } catch (e) {
        return null;
    }
}

// Fetch official description() (keccak256("description()")[0..4] => 0x7284e416)
async function fetchFeedDescription(address) {
    const payload = {
        jsonrpc: '2.0',
        id: 999,
        method: 'eth_call',
        params: [{ to: address, data: '0x7284e416' }, 'latest']
    };

    for (const rpc of PUBLIC_RPCS) {
        try {
            const res = await fetch(rpc, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.result && data.result !== '0x') {
                    const desc = decodeAbiString(data.result);
                    if (desc) return desc;
                }
            }
        } catch (err) {
            // try next RPC
        }
    }
    return null;
}

// Auto-lookup coin name/symbol when official Chainlink proxy address is entered/pasted
let addressLookupTimer = null;
window.handleAddressInput = function(val) {
    clearTimeout(addressLookupTimer);
    const symInput = document.getElementById('customSymbolInput');
    const cleanAddr = val ? val.trim() : '';

    if (!cleanAddr.startsWith('0x') || cleanAddr.length !== 42) {
        return;
    }

    addressLookupTimer = setTimeout(async () => {
        showFeedMsg('⛓️ Querying on-chain contract...', 'info');
        const desc = await fetchFeedDescription(cleanAddr);
        if (desc) {
            const baseSymbol = desc.split('/')[0].trim().toUpperCase();
            if (symInput) {
                symInput.value = baseSymbol;
            }
            showFeedMsg(`✓ Automatically detected: ${desc}`, 'success');
        } else {
            showFeedMsg('⚠️ Contract description unreadable; you may enter symbol manually.', 'info');
        }
    }, 180);
};

// Add Coin Handlers
window.quickAddFeed = function(symbol, address, name) {
    const custom = getCustomCoins();
    if (custom.some(c => c.symbol.toUpperCase() === symbol.toUpperCase()) || FIXED_FEEDS.some(f => f.symbol === symbol)) {
        showFeedMsg(`${symbol} is already in your watchlist!`, 'error');
        return;
    }
    custom.push({ symbol: symbol.toUpperCase(), name: name || symbol, address: address.trim() });
    saveCustomCoins(custom);
    renderWatchlistItems();
    fetchChainlinkPrices();
    closeAddCoinModal();
};

window.submitCustomFeed = async function() {
    const symInput = document.getElementById('customSymbolInput');
    const addrInput = document.getElementById('customAddressInput');
    if (!symInput || !addrInput) return;

    let symbol = symInput.value.trim().toUpperCase();
    const address = addrInput.value.trim();

    if (!address.startsWith('0x') || address.length !== 42) {
        showFeedMsg('Please enter a valid Ethereum Chainlink Proxy address (0x... 42 characters)', 'error');
        return;
    }

    // Auto-resolve symbol from on-chain contract if empty
    if (!symbol) {
        showFeedMsg('⛓️ Resolving symbol from contract...', 'info');
        const desc = await fetchFeedDescription(address);
        if (desc) {
            symbol = desc.split('/')[0].trim().toUpperCase();
            symInput.value = symbol;
        } else {
            showFeedMsg('Please specify an asset symbol (e.g. AVAX)', 'error');
            return;
        }
    }

    const custom = getCustomCoins();
    if (custom.some(c => c.symbol === symbol) || FIXED_FEEDS.some(f => f.symbol === symbol)) {
        showFeedMsg(`${symbol} is already in your watchlist!`, 'error');
        return;
    }

    custom.push({ symbol, name: symbol, address });
    saveCustomCoins(custom);
    symInput.value = '';
    addrInput.value = '';
    renderWatchlistItems();
    fetchChainlinkPrices();
    closeAddCoinModal();
};

window.removeCustomCoin = function(symbol) {
    const custom = getCustomCoins().filter(c => c.symbol !== symbol);
    saveCustomCoins(custom);
    renderWatchlistItems();
    fetchChainlinkPrices();
};

function showFeedMsg(msg, type) {
    const el = document.getElementById('feedFormMsg');
    if (!el) return;
    el.textContent = msg;
    el.className = `feed-form-msg ${type}`;
    if (type !== 'info') {
        setTimeout(() => { 
            if (el && el.textContent === msg) el.textContent = ''; 
        }, 4000);
    }
}

// Fetch Prices from Chainlink for ALL feeds (Fixed + Custom)
async function fetchChainlinkPrices() {
    if (isFetching) return;
    isFetching = true;

    try {
        const allFeeds = getAllFeeds();

    const batch = allFeeds.map((feed, idx) => ({
        jsonrpc: '2.0',
        id: idx + 1,
        method: 'eth_call',
        params: [{ to: feed.address, data: '0xfeaf968c' }, 'latest']
    }));

    function parseAnswer(item) {
        if (!item || !item.result || item.result.length < 130) return null;
        try {
            const raw = item.result.slice(2);
            const answerHex = '0x' + raw.slice(64, 128); // 2nd 32-byte chunk
            const priceInt = BigInt(answerHex);
            return Number(priceInt) / 1e8; // Chainlink USD pairs use 8 decimals
        } catch (e) {
            return null;
        }
    }

    const prices = getCachedPrices();

    for (const rpc of PUBLIC_RPCS) {
        try {
            const res = await fetch(rpc, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(batch)
            });

            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    let anySuccess = false;
                    allFeeds.forEach((feed, idx) => {
                        const item = data.find(d => d.id === idx + 1);
                        const val = parseAnswer(item);
                        if (val && val > 0) {
                            prices[feed.symbol] = val;
                            anySuccess = true;
                        }
                    });
                    if (anySuccess) break;
                }
            }
        } catch (err) {
            // Silently try next failover RPC
        }
    }

    // Default fallbacks for BTC & ETH if offline
    prices.BTC = prices.BTC || 79640.00;
    prices.ETH = prices.ETH || 2458.00;

    localStorage.setItem('whalestack_chainlink_prices', JSON.stringify(prices));

        // Update prices in Market list
        allFeeds.forEach(feed => {
            const el = document.getElementById(`dropPrice_${feed.symbol}`);
            if (el && prices[feed.symbol]) {
                const formatted = formatPrice(prices[feed.symbol]);
                if (el.textContent !== formatted) {
                    el.textContent = formatted;
                    el.classList.add('price-updated');
                    setTimeout(() => el.classList.remove('price-updated'), 1000);
                }
            }
        });
    } finally {
        isFetching = false;
    }
}

// User-triggered manual refresh
window.refreshChainlinkPrices = function() {
    if (isRefreshing) return;
    isRefreshing = true;
    const btn = document.getElementById('chainlinkRefreshBtn');
    if (btn) btn.classList.add('spinning');
    fetchChainlinkPrices().finally(() => {
        setTimeout(() => {
            isRefreshing = false;
            if (btn) btn.classList.remove('spinning');
        }, 800);
    });
};

// Inline Tool Viewer
window.openTool = function(url, title) {
    const grid = document.getElementById('toolsGrid');
    const viewer = document.getElementById('toolViewer');
    const iframe = document.getElementById('toolIframe');
    const titleEl = document.getElementById('toolViewerTitle');

    if (!grid || !viewer || !iframe) return;

    iframe.src = url;
    iframe.onload = () => {
        const isLight = document.body.classList.contains('light-mode');
        try {
            iframe.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: isLight ? 'light' : 'dark' }, '*');
        } catch (e) {}
    };

    if (titleEl) titleEl.textContent = title || 'Financial Tool';
    document.title = `${title || 'Tool'} — WhaleStack`;

    grid.classList.add('hidden');
    viewer.classList.remove('hidden');
    viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeTool = title;
};

window.closeTool = function() {
    const grid = document.getElementById('toolsGrid');
    const viewer = document.getElementById('toolViewer');
    const iframe = document.getElementById('toolIframe');

    if (!grid || !viewer || !iframe) return;

    iframe.src = '';
    viewer.classList.add('hidden');
    grid.classList.remove('hidden');
    document.title = 'WhaleStack';
    activeTool = null;
};

// SPA Routing (Tools, Links, About)
function handleRouting() {
    const hash = window.location.hash || '#tools';
    let pageId = 'tools';
    if (hash === '#about') pageId = 'about';
    else if (hash === '#links') pageId = 'links';

    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    const targetLink = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
    if (targetLink) targetLink.classList.add('active');

    if (pageId !== 'tools') closeTool();
}

// Theme Management
function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('whalestack-theme');

    if (saved === 'light') {
        document.body.classList.add('light-mode');
        if (toggle) toggle.checked = true;
    }

    if (toggle) {
        toggle.addEventListener('change', () => {
            const isLight = toggle.checked;
            document.body.classList.toggle('light-mode', isLight);
            localStorage.setItem('whalestack-theme', isLight ? 'light' : 'dark');

            const iframe = document.getElementById('toolIframe');
            if (iframe && iframe.contentWindow) {
                try {
                    iframe.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: isLight ? 'light' : 'dark' }, '*');
                } catch (e) {}
            }
        });
    }
}

// Minimal Links Search & Filtering
window.filterMinimalLinks = function(query) {
    const q = (query || '').toLowerCase().trim();
    const tiles = document.querySelectorAll('.link-tile');
    const clearBtn = document.getElementById('linksClearBtn');
    if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);

    let visibleCount = 0;
    tiles.forEach(tile => {
        const keywords = (tile.getAttribute('data-keywords') || '').toLowerCase();
        const text = tile.textContent.toLowerCase();
        const match = !q || keywords.includes(q) || text.includes(q);
        tile.classList.toggle('hidden', !match);
        if (match) visibleCount++;
    });

    const empty = document.getElementById('linksEmpty');
    if (empty) empty.classList.toggle('hidden', visibleCount > 0);
};

window.clearMinimalLinksSearch = function() {
    const input = document.getElementById('linksSearchInput');
    if (input) {
        input.value = '';
        window.filterMinimalLinks('');
        input.focus();
    }
};

// App Initialization
function init() {
    setupTheme();
    handleRouting();
    renderWatchlistItems();
    fetchChainlinkPrices();

    // Automatically refresh Chainlink oracle prices every 5s in background
    priceInterval = setInterval(() => {
        if (document.visibilityState === 'visible') fetchChainlinkPrices();
    }, 5000);

    // Navigation & Shortcuts
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (activeTool) closeTool();
            closeAddCoinModal();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
