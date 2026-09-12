// WhaleStack — Real-Time Market Data (Coinbase WS)

let activeTool     = null;
let labelInterval  = null;
let liveWs         = null;   // WebSocket instance
let wsReconnTimer  = null;   // reconnect timer
let wsConnected    = false;  // connection state

// Fixed Core Feeds (Always fixed & permanent - cannot be removed)
const FIXED_FEEDS = [
    { symbol: 'BTC', name: 'Bitcoin',  cgId: 'bitcoin',  thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png' },
    { symbol: 'ETH', name: 'Ethereum', cgId: 'ethereum', thumb: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png' }
];

// ─── Formatters ──────────────────────────────────────────────────────────────

function formatPrice(num) {
    if (typeof num !== 'number' || isNaN(num) || num <= 0) return '—';
    if (num < 0.01) return '$' + num.toFixed(6);
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: num >= 1000 ? 2 : 4
    }).format(num);
}

// ─── LocalStorage Helpers ─────────────────────────────────────────────────────

function getCustomCoins() {
    try {
        const stored = localStorage.getItem('whalestack_custom_coins');
        return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
}

function saveCustomCoins(coins) {
    try { localStorage.setItem('whalestack_custom_coins', JSON.stringify(coins)); } catch (e) {}
}

// ─── Coin Order ───────────────────────────────────────────────────────────────

function getCoinOrder() {
    try {
        const stored = localStorage.getItem('whalestack_coin_order');
        return stored ? JSON.parse(stored) : null;
    } catch (e) { return null; }
}

function saveCoinOrder(order) {
    try { localStorage.setItem('whalestack_coin_order', JSON.stringify(order)); } catch (e) {}
}

function getAllFeeds() {
    // Fixed feeds always appear first, in original order
    const fixed  = [...FIXED_FEEDS];
    const custom = getCustomCoins();
    const order  = getCoinOrder();

    let sortedCustom = custom;
    if (order && order.length) {
        const orderMap = {};
        order.forEach((sym, i) => { orderMap[sym] = i; });
        sortedCustom = [...custom].sort((a, b) => {
            const ai = orderMap[a.symbol] ?? 9999;
            const bi = orderMap[b.symbol] ?? 9999;
            return ai - bi;
        });
    }

    return [...fixed, ...sortedCustom];
}

let memPrices = null;
let saveStorageTimer = null;

function getCachedPrices() {
    if (memPrices) return memPrices;
    try {
        memPrices = JSON.parse(localStorage.getItem('whalestack_prices') || '{}');
    } catch (e) { memPrices = {}; }
    return memPrices;
}

function scheduleStorageSave() {
    if (saveStorageTimer) return;
    saveStorageTimer = setTimeout(() => {
        saveStorageTimer = null;
        if (memPrices) {
            try { localStorage.setItem('whalestack_prices', JSON.stringify(memPrices)); } catch (e) {}
        }
    }, 2500);
}

// ─── Watchlist Render ─────────────────────────────────────────────────────────

function renderWatchlistItems() {
    const container = document.getElementById('watchlistItems');
    if (!container) return;

    const feeds        = getAllFeeds();
    const customSyms   = new Set(getCustomCoins().map(c => c.symbol));
    const cachedPrices = getCachedPrices();
    let html = '';

    feeds.forEach(coin => {
        const isFixed      = !customSyms.has(coin.symbol);
        const priceDisplay = formatPrice(cachedPrices[coin.symbol] || 0);
        const logoHtml     = coin.thumb
            ? `<img src="${coin.thumb}" class="watchlist-coin-logo" alt="${coin.symbol}" onerror="this.style.display='none'">`
            : `<span class="watchlist-coin-logo-fallback"><i class="fa-solid fa-coins"></i></span>`;

        // Fixed rows: spacer (same width as drag handle) — keeps logo alignment consistent
        // Custom rows: draggable grip icon
        const handleHtml = isFixed
            ? `<span class="drag-handle drag-handle--fixed" aria-hidden="true"></span>`
            : `<span class="drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></span>`;

        const deleteBtn = isFixed ? '' : `
            <button type="button" onclick="removeCustomCoin('${coin.symbol}')" class="coin-delete-btn" title="Remove ${coin.symbol}">
                <i class="fa-solid fa-xmark"></i>
            </button>`;

        // Fixed rows: not draggable. Custom rows: draggable
        html += `
            <div class="watchlist-row ${isFixed ? 'fixed-row' : 'custom-row draggable-row'}"
                 ${isFixed ? '' : 'draggable="true"'}
                 data-symbol="${coin.symbol}">
                ${handleHtml}
                <div class="watchlist-coin-info">
                    ${logoHtml}
                    <div class="watchlist-coin-names">
                        <span class="watchlist-coin-symbol">${coin.symbol}</span>
                        <span class="watchlist-coin-fullname">${coin.name}</span>
                    </div>
                </div>
                <div class="watchlist-coin-right">
                    <span class="watchlist-coin-price" id="dropPrice_${coin.symbol}">${priceDisplay}</span>
                    ${deleteBtn}
                </div>
            </div>`;
    });

    container.innerHTML = html;
    initDragAndDrop(container);
}

// ─── Drag & Drop Reorder ──────────────────────────────────────────────────────

function initDragAndDrop(container) {
    let dragSrc = null;
    let placeholder = null;

    function createPlaceholder(height) {
        const el = document.createElement('div');
        el.className = 'drag-placeholder';
        el.style.height = height + 'px';
        return el;
    }

    function getRows() {
        return [...container.querySelectorAll('.draggable-row')];
    }

    container.querySelectorAll('.draggable-row').forEach(row => {
        row.addEventListener('dragstart', e => {
            dragSrc = row;
            row.classList.add('dragging');
            placeholder = createPlaceholder(row.offsetHeight);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', row.dataset.symbol);
            // Insert placeholder after a tick so row doesn't disappear instantly
            setTimeout(() => {
                if (row.parentNode) row.parentNode.insertBefore(placeholder, row.nextSibling);
                row.style.opacity = '0.35';
            }, 0);
        });

        row.addEventListener('dragend', () => {
            row.classList.remove('dragging');
            row.style.opacity = '';
            if (placeholder && placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
            placeholder = null;
            dragSrc = null;

            // Persist new order
            const newOrder = getRows().map(r => r.dataset.symbol);
            saveCoinOrder(newOrder);
        });

        row.addEventListener('dragover', e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (!dragSrc || !placeholder || row === dragSrc) return;

            const rect = row.getBoundingClientRect();
            const mid  = rect.top + rect.height / 2;
            if (e.clientY < mid) {
                container.insertBefore(placeholder, row);
            } else {
                container.insertBefore(placeholder, row.nextSibling);
            }
        });

        row.addEventListener('drop', e => {
            e.preventDefault();
            if (!dragSrc || row === dragSrc) return;

            const rect = row.getBoundingClientRect();
            const mid  = rect.top + rect.height / 2;
            if (e.clientY < mid) {
                container.insertBefore(dragSrc, row);
            } else {
                container.insertBefore(dragSrc, row.nextSibling);
            }
        });
    });

    // Also handle drop on the container itself (empty area below items)
    container.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
}

// ─── Coinbase WebSocket — Price Fetching ───────────────────────────────────────

function applyPriceUpdate(symbol, price, forceFlash = false) {
    if (!price || price <= 0) return;
    const prices = getCachedPrices();
    prices[symbol] = price;
    scheduleStorageSave();
    updateLastUpdatedLabel();

    const el = document.getElementById(`dropPrice_${symbol}`);
    if (!el) return;
    const formatted = formatPrice(price);
    const changed   = el.textContent !== formatted;
    el.textContent  = formatted;
    if (changed || forceFlash) {
        el.classList.remove('price-updated');
        void el.offsetWidth;
        el.classList.add('price-updated');
        setTimeout(() => el.classList.remove('price-updated'), 1400);
    }
}

function updateLastUpdatedLabel() {
    const sourceTag = document.getElementById('marketSourceTag');
    if (sourceTag) {
        sourceTag.textContent = wsConnected ? 'Live' : 'Offline';
    }
}

function connectCoinbaseWS() {
    if (liveWs) {
        try { liveWs.close(); } catch (e) {}
        liveWs = null;
    }
    clearTimeout(wsReconnTimer);

    const allFeeds = getAllFeeds();
    if (!allFeeds.length) return;

    const productIds = allFeeds.map(f => `${f.symbol.toUpperCase()}-USD`);

    try {
        liveWs = new WebSocket('wss://ws-feed.exchange.coinbase.com');

        liveWs.onopen = () => {
            wsConnected = true;
            console.log('[WhaleStack] Coinbase WS connected — real-time mode');
            updateLastUpdatedLabel();

            liveWs.send(JSON.stringify({
                type: 'subscribe',
                product_ids: productIds,
                channels: ['ticker']
            }));
        };

        liveWs.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                if (msg.type === 'ticker' && msg.product_id && msg.price) {
                    const price = parseFloat(msg.price);
                    const symbol = msg.product_id.split('-')[0];
                    if (symbol) applyPriceUpdate(symbol, price);
                }
            } catch (e) {}
        };

        liveWs.onclose = () => {
            wsConnected = false;
            updateLastUpdatedLabel();
            console.warn('[WhaleStack] Coinbase WS closed — reconnecting in 5s...');
            wsReconnTimer = setTimeout(connectCoinbaseWS, 5000);
        };

        liveWs.onerror = () => {};
    } catch (e) {
        console.warn('[WhaleStack] WebSocket not supported or failed', e);
    }
}



// ─── CoinGecko — Coin Search ──────────────────────────────────────────────────

let searchTimer = null;

window.handleCoinSearch = function (val) {
    clearTimeout(searchTimer);
    const dropdown = document.getElementById('coinSearchDropdown');
    const query = (val || '').trim();

    if (query.length < 2) {
        if (dropdown) dropdown.classList.add('hidden');
        showFeedMsg('', '');
        return;
    }

    showFeedMsg('Searching...', 'info');

    searchTimer = setTimeout(async () => {
        // Guard: don't populate if modal was closed
        const modal = document.getElementById('addCoinModal');
        if (!modal || modal.classList.contains('hidden')) return;

        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
                { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(8000) }
            );
            if (!res.ok) { showFeedMsg('Search failed. Try again.', 'error'); return; }

            const data = await res.json();
            const coins = (data.coins || []).slice(0, 8);

            const dropdownEl = document.getElementById('coinSearchDropdown');
            if (!dropdownEl) return;

            // Guard again after await in case modal was closed
            const modalEl = document.getElementById('addCoinModal');
            if (!modalEl || modalEl.classList.contains('hidden')) return;

            if (coins.length === 0) {
                dropdownEl.innerHTML = `<div class="search-no-result">No coins found for "${query}".</div>`;
                dropdownEl.classList.remove('hidden');
                showFeedMsg('', '');
                return;
            }

            // Escape helper to prevent XSS in coin names
            const esc = str => str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

            dropdownEl.innerHTML = coins.map(c => {
                const rank = c.market_cap_rank ? `<span class="search-result-rank">#${c.market_cap_rank}</span>` : '';
                const thumbUrl = (c.thumb && !c.thumb.includes('missing')) ? c.thumb : '';
                const thumbHtml = thumbUrl
                    ? `<img src="${thumbUrl}" class="search-result-thumb" alt="" onerror="this.style.display='none'" loading="lazy">`
                    : `<span class="search-result-thumb-placeholder"><i class="fa-solid fa-coins"></i></span>`;
                return `
                    <div class="search-result-item" data-id="${esc(c.id)}" data-symbol="${esc(c.symbol.toUpperCase())}" data-name="${encodeURIComponent(c.name)}" data-thumb="${encodeURIComponent(thumbUrl)}">
                        ${thumbHtml}
                        <div class="search-result-text">
                            <span class="search-result-symbol">${esc(c.symbol.toUpperCase())}</span>
                            <span class="search-result-name">${esc(c.name)}</span>
                        </div>
                        ${rank}
                    </div>`;
            }).join('');

            // Use single delegated handler (set once, replaced each render)
            dropdownEl.onclick = (e) => {
                const item = e.target.closest('.search-result-item');
                if (!item) return;
                const cgId = item.getAttribute('data-id');
                const symbol = item.getAttribute('data-symbol');
                const name = decodeURIComponent(item.getAttribute('data-name') || '');
                const thumb = decodeURIComponent(item.getAttribute('data-thumb') || '');
                selectCoin(cgId, symbol, name, thumb);
            };

            dropdownEl.classList.remove('hidden');
            showFeedMsg('', '');
        } catch (e) {
            if (e.name !== 'AbortError' && e.name !== 'TimeoutError') {
                showFeedMsg('Connection error. Please try again.', 'error');
            }
        }
    }, 400);
};

async function fetchCoinGeckoPrice(symbol, cgId) {
    if (!cgId) return;
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(cgId)}&vs_currencies=usd`, {
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(6000)
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data[cgId] && typeof data[cgId].usd === 'number') {
            applyPriceUpdate(symbol, data[cgId].usd, true);
        }
    } catch (e) {}
}

function fetchMissingPrices() {
    const feeds = getAllFeeds();
    const cached = getCachedPrices();
    const missing = feeds.filter(f => (!cached[f.symbol] || cached[f.symbol] <= 0) && f.cgId);
    if (!missing.length) return;

    const ids = missing.map(m => m.cgId).join(',');
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(6000)
    }).then(res => res.ok ? res.json() : null).then(data => {
        if (!data) return;
        missing.forEach(m => {
            if (data[m.cgId] && typeof data[m.cgId].usd === 'number') {
                applyPriceUpdate(m.symbol, data[m.cgId].usd);
            }
        });
    }).catch(() => {});
}

window.selectCoin = function (cgId, symbol, name, thumb) {
    const custom = getCustomCoins();

    // Check by both symbol AND cgId to handle coins sharing the same ticker
    if (FIXED_FEEDS.some(f => f.symbol === symbol || f.cgId === cgId)) {
        showFeedMsg(`${symbol} is already in your watchlist!`, 'error');
        return;
    }
    if (custom.some(c => c.symbol === symbol || c.cgId === cgId)) {
        showFeedMsg(`${symbol} is already in your watchlist!`, 'error');
        return;
    }

    custom.push({ symbol, name, cgId, thumb: thumb || '' });
    saveCustomCoins(custom);
    renderWatchlistItems();
    // Reconnect Coinbase WebSocket to stream newly added coin in real time
    connectCoinbaseWS();
    // Immediate price fetch via CoinGecko so coins not traded on Coinbase (e.g. BNB, TON, TRX) get price instantly
    if (cgId) fetchCoinGeckoPrice(symbol, cgId);
    closeAddCoinModal();
};

window.removeCustomCoin = function (symbol) {
    const custom = getCustomCoins().filter(c => c.symbol !== symbol);
    saveCustomCoins(custom);
    // Remove from price cache
    try {
        const prices = getCachedPrices();
        delete prices[symbol];
        localStorage.setItem('whalestack_prices', JSON.stringify(prices));
    } catch (e) {}
    renderWatchlistItems();
    // Reconnect WebSocket with updated coin list
    if (typeof connectCoinbaseWS === 'function') connectCoinbaseWS();
};

// ─── Modal Controls ───────────────────────────────────────────────────────────

window.openAddCoinModal = function () {
    const modal = document.getElementById('addCoinModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    // Reset state
    const input = document.getElementById('coinSearchInput');
    const dropdown = document.getElementById('coinSearchDropdown');
    const msg = document.getElementById('feedFormMsg');
    if (input) { input.value = ''; setTimeout(() => input.focus(), 150); }
    if (dropdown) dropdown.classList.add('hidden');
    if (msg) msg.textContent = '';
};

window.closeAddCoinModal = function () {
    const modal = document.getElementById('addCoinModal');
    if (modal) modal.classList.add('hidden');
    // Hide dropdown
    const dropdown = document.getElementById('coinSearchDropdown');
    if (dropdown) dropdown.classList.add('hidden');
    clearTimeout(searchTimer);
};

function showFeedMsg(msg, type) {
    const el = document.getElementById('feedFormMsg');
    if (!el) return;
    el.textContent = msg;
    el.className = `feed-form-msg ${type || ''}`.trim();
    if (type && type !== 'info' && msg) {
        setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 4000);
    }
}

// ─── Inline Tool Viewer ───────────────────────────────────────────────────────

window.openTool = function (url, title) {
    const grid   = document.getElementById('toolsGrid');
    const viewer = document.getElementById('toolViewer');
    const iframe = document.getElementById('toolIframe');
    const titleEl = document.getElementById('toolViewerTitle');
    if (!grid || !viewer || !iframe) return;

    iframe.src = url;
    iframe.onload = () => {
        const isLight = document.body.classList.contains('light-mode');
        try { iframe.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: isLight ? 'light' : 'dark' }, '*'); } catch (e) {}
    };

    if (titleEl) titleEl.textContent = title || 'Financial Tool';
    document.title = `${title || 'Tool'} — WhaleStack`;
    grid.classList.add('hidden');
    viewer.classList.remove('hidden');
    viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeTool = title;
};

window.closeTool = function () {
    const grid   = document.getElementById('toolsGrid');
    const viewer = document.getElementById('toolViewer');
    const iframe = document.getElementById('toolIframe');
    if (!grid || !viewer || !iframe) return;

    iframe.src = '';
    viewer.classList.add('hidden');
    grid.classList.remove('hidden');
    document.title = 'WhaleStack';
    activeTool = null;
};

// ─── SPA Routing ──────────────────────────────────────────────────────────────

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

// ─── Theme ────────────────────────────────────────────────────────────────────

function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved  = localStorage.getItem('whalestack-theme');

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
                try { iframe.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: isLight ? 'light' : 'dark' }, '*'); } catch (e) {}
            }
        });
    }
}

// ─── Links Search ─────────────────────────────────────────────────────────────

window.filterMinimalLinks = function (query) {
    const q = (query || '').toLowerCase().trim();
    const tiles    = document.querySelectorAll('.link-tile');
    const clearBtn = document.getElementById('linksClearBtn');
    if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);

    let visibleCount = 0;
    tiles.forEach(tile => {
        const keywords = (tile.getAttribute('data-keywords') || '').toLowerCase();
        const text     = tile.textContent.toLowerCase();
        const match    = !q || keywords.includes(q) || text.includes(q);
        tile.classList.toggle('hidden', !match);
        if (match) visibleCount++;
    });

    const empty = document.getElementById('linksEmpty');
    if (empty) empty.classList.toggle('hidden', visibleCount > 0);
};

window.clearMinimalLinksSearch = function () {
    const input = document.getElementById('linksSearchInput');
    if (input) { input.value = ''; window.filterMinimalLinks(''); input.focus(); }
};

// ─── App Init ─────────────────────────────────────────────────────────────────

function init() {
    setupTheme();
    handleRouting();
    renderWatchlistItems();

    // Dynamic link counter
    const linkTiles    = document.querySelectorAll('.link-tile');
    const linksCountEl = document.getElementById('linksCount');
    if (linksCountEl && linkTiles.length > 0) {
        linksCountEl.textContent = linkTiles.length + ' Tools';
    }

    // Connect Coinbase WebSocket for real-time updates
    connectCoinbaseWS();

    // Fallback: Fetch any missing prices (e.g. coins not traded on Coinbase)
    fetchMissingPrices();

    // Update label every 10 seconds when WS is down
    labelInterval = setInterval(updateLastUpdatedLabel, 10000);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            if (!wsConnected) {
                // Reconnect WS
                connectCoinbaseWS();
            }
            fetchMissingPrices();
        }
    });

    // Enter key support in search input to select top result
    const searchInput = document.getElementById('coinSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const dropdown = document.getElementById('coinSearchDropdown');
                if (dropdown && !dropdown.classList.contains('hidden')) {
                    const firstItem = dropdown.querySelector('.search-result-item');
                    if (firstItem) firstItem.click();
                }
            }
        });
    }

    // Flush in-memory price cache on tab close
    window.addEventListener('beforeunload', () => {
        if (memPrices) {
            try { localStorage.setItem('whalestack_prices', JSON.stringify(memPrices)); } catch (e) {}
        }
    });

    // Navigation & shortcuts
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (activeTool) closeTool();
            closeAddCoinModal();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', e => {
        const dropdown = document.getElementById('coinSearchDropdown');
        const input    = document.getElementById('coinSearchInput');
        if (dropdown && input && !dropdown.contains(e.target) && e.target !== input) {
            dropdown.classList.add('hidden');
        }
    });

    // Listen for close tool message from iframes
    window.addEventListener('message', e => {
        if (e.data && e.data.type === 'CLOSE_TOOL') {
            closeTool();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
