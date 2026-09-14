// WhaleStack — Real-Time Market Data (CoinGecko API)

let activeTool    = null;
let labelInterval = null;
let pollingTimer  = null;

// ─── API Rate Limit & Backoff ──────────────────────────────────────────────────
let fetchFailCount = 0;
let lastFetchTime  = 0;
const MIN_FETCH_INTERVAL = 5000;

function getBackoffDelay() {
    if (fetchFailCount === 0) return 0;
    return Math.min(5000 * Math.pow(2, fetchFailCount - 1), 60000);
}

// ─── Broadcast Channel (Leader Election) ──────────────────────────────────────
const bc = new BroadcastChannel('whalestack_leader');
let isLeader = false;
let leaderPingTimer = null;
let electionTimeout = null;
let leaderHeartbeatReceived = false;

function becomeLeader() {
    if (isLeader) return;
    isLeader = true;
    if (leaderPingTimer) clearInterval(leaderPingTimer);
    leaderPingTimer = setInterval(() => {
        bc.postMessage({ type: 'HEARTBEAT' });
    }, 2000);
    fetchCoinGeckoPrices();
}

function resetElectionTimeout() {
    if (electionTimeout) clearTimeout(electionTimeout);
    electionTimeout = setTimeout(() => {
        if (!isLeader) becomeLeader();
    }, 3500);
}

bc.onmessage = (event) => {
    if (event.data.type === 'HEARTBEAT') {
        leaderHeartbeatReceived = true;
        isLeader = false;
        if (leaderPingTimer) { clearInterval(leaderPingTimer); leaderPingTimer = null; }
        resetElectionTimeout();
    } else if (event.data.type === 'PRICE_UPDATE') {
        const updates = event.data.payload;
        if (Array.isArray(updates)) {
            updates.forEach(u => applyPriceUpdate(u.symbol, u.price, u.change24h));
        }
        updateLastUpdatedLabel(false);
    }
};

// ─── Fixed Core Feeds ──────────────────────────────────────────────────────────
const FIXED_FEEDS = [
    {
        symbol: 'BTC', name: 'Bitcoin',
        coingeckoId: 'bitcoin',
        thumb: 'https://coin-images.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    {
        symbol: 'ETH', name: 'Ethereum',
        coingeckoId: 'ethereum',
        thumb: 'https://coin-images.coingecko.com/coins/images/279/thumb/ethereum.png'
    }
];

// ─── Formatters ────────────────────────────────────────────────────────────────
function formatPrice(num) {
    if (typeof num !== 'number' || isNaN(num) || num <= 0) return '—';
    if (num < 0.0001) {
        let str = num.toFixed(10).replace(/0+$/, '');
        if (str.includes('.')) {
            const [int, dec] = str.split('.');
            return '$' + int + '.' + (dec.length > 8 ? dec.substring(0, 8) : dec);
        }
        return '$' + str;
    }
    if (num < 0.01) return '$' + num.toFixed(6);
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: num >= 1000 ? 2 : 4
    }).format(num);
}

// ─── LocalStorage Helpers ──────────────────────────────────────────────────────
function getCustomCoins() {
    try {
        const stored = localStorage.getItem('whalestack_custom_coins');
        return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
}

function saveCustomCoins(coins) {
    try { localStorage.setItem('whalestack_custom_coins', JSON.stringify(coins)); } catch (e) {}
}

// ─── Coin Order ────────────────────────────────────────────────────────────────
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
let memChanges = null;
let saveStorageTimer = null;

function getCachedPrices() {
    if (memPrices) return memPrices;
    try {
        memPrices = JSON.parse(localStorage.getItem('whalestack_prices') || '{}');
    } catch (e) { memPrices = {}; }
    return memPrices;
}

function getCachedChanges() {
    if (memChanges) return memChanges;
    try {
        memChanges = JSON.parse(localStorage.getItem('whalestack_changes') || '{}');
    } catch (e) { memChanges = {}; }
    return memChanges;
}

function scheduleStorageSave() {
    if (saveStorageTimer) return;
    saveStorageTimer = setTimeout(() => {
        saveStorageTimer = null;
        if (memPrices) {
            try { localStorage.setItem('whalestack_prices', JSON.stringify(memPrices)); } catch (e) {}
        }
        if (memChanges) {
            try { localStorage.setItem('whalestack_changes', JSON.stringify(memChanges)); } catch (e) {}
        }
    }, 2500);
}

function flushCacheToStorage() {
    if (memPrices) {
        try { localStorage.setItem('whalestack_prices', JSON.stringify(memPrices)); } catch (e) {}
    }
    if (memChanges) {
        try { localStorage.setItem('whalestack_changes', JSON.stringify(memChanges)); } catch (e) {}
    }
}

// ─── Watchlist Render ──────────────────────────────────────────────────────────
function renderWatchlistItems() {
    const container = document.getElementById('watchlistItems');
    if (!container) return;

    const feeds        = getAllFeeds();
    const customSyms   = new Set(getCustomCoins().map(c => c.symbol));
    const cachedPrices = getCachedPrices();
    const cachedChgs   = getCachedChanges();
    let html = '';

    feeds.forEach(coin => {
        const isFixed      = !customSyms.has(coin.symbol);
        const priceDisplay = formatPrice(cachedPrices[coin.symbol] || 0);
        const change24h    = cachedChgs[coin.symbol];
        const hasChange    = typeof change24h === 'number' && !isNaN(change24h);
        const changeClass  = hasChange ? (change24h >= 0 ? 'change-positive' : 'change-negative') : 'change-neutral';
        const changeText   = hasChange ? (change24h >= 0 ? '+' : '') + change24h.toFixed(2) + '%' : '';
        const changeBadge  = changeText
            ? `<span class="watchlist-change ${changeClass}" id="dropChange_${coin.symbol}">${changeText}</span>`
            : `<span class="watchlist-change change-neutral" id="dropChange_${coin.symbol}"></span>`;

        const logoHtml     = coin.thumb
            ? `<img src="${coin.thumb}" class="watchlist-coin-logo" alt="${coin.symbol}" onerror="this.style.display='none'">`
            : `<span class="watchlist-coin-logo-fallback"><i class="fa-solid fa-coins"></i></span>`;

        const handleHtml = isFixed
            ? `<span class="drag-handle drag-handle--fixed" aria-hidden="true"></span>`
            : `<span class="drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></span>`;

        const deleteBtn = isFixed ? '' : `
            <button type="button" onclick="removeCustomCoin('${coin.symbol}')" class="coin-delete-btn" title="Remove ${coin.symbol}">
                <i class="fa-solid fa-xmark"></i>
            </button>`;

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
                    <div class="watchlist-price-col">
                        <span class="watchlist-coin-price" id="dropPrice_${coin.symbol}">${priceDisplay}</span>
                        ${changeBadge}
                    </div>
                    ${deleteBtn}
                </div>
            </div>`;
    });

    container.innerHTML = html;
    initDragAndDrop(container);
}

// ─── Drag & Drop Reorder ───────────────────────────────────────────────────────
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

    container.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
}

// ─── Price Update & Label ──────────────────────────────────────────────────────
function applyPriceUpdate(symbol, price, change24h, forceFlash = false) {
    if (!price || price <= 0) return;
    const prices = getCachedPrices();
    prices[symbol] = price;

    if (typeof change24h === 'number' && !isNaN(change24h)) {
        const changes = getCachedChanges();
        changes[symbol] = change24h;
    }

    scheduleStorageSave();

    const el = document.getElementById('dropPrice_' + symbol);
    if (el) {
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

    if (typeof change24h === 'number' && !isNaN(change24h)) {
        const chEl = document.getElementById('dropChange_' + symbol);
        if (chEl) {
            const sign = change24h >= 0 ? '+' : '';
            chEl.textContent = sign + change24h.toFixed(2) + '%';
            chEl.className = 'watchlist-change ' + (change24h >= 0 ? 'change-positive' : 'change-negative');
        }
    }
}

function updateLastUpdatedLabel(isError) {
    const sourceTag = document.getElementById('marketSourceTag');
    if (sourceTag) {
        if (isError) {
            sourceTag.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color:var(--danger)"></i> Error';
        } else {
            sourceTag.textContent = 'Live';
        }
    }
}

// ─── CoinGecko — Coin Search ───────────────────────────────────────────────────
let searchTimer = null;
let searchAbortController = null;

window.handleCoinSearch = function (val) {
    clearTimeout(searchTimer);
    if (searchAbortController) {
        searchAbortController.abort();
        searchAbortController = null;
    }

    const dropdown = document.getElementById('coinSearchDropdown');
    const query = (val || '').trim();

    if (query.length < 2) {
        if (dropdown) dropdown.classList.add('hidden');
        showFeedMsg('', '');
        return;
    }

    showFeedMsg("CoinGecko'da aranıyor...", 'info');

    searchTimer = setTimeout(async () => {
        const modal = document.getElementById('addCoinModal');
        if (!modal || modal.classList.contains('hidden')) return;

        const dropdownEl = document.getElementById('coinSearchDropdown');
        if (!dropdownEl) return;

        dropdownEl.innerHTML = '<div class="search-no-result"><i class="fa-solid fa-spinner fa-spin" style="margin-right:6px"></i>Yukleniyor...</div>';
        dropdownEl.classList.remove('hidden');

        searchAbortController = new AbortController();
        try {
            const res = await fetch(
                'https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(query),
                { signal: searchAbortController.signal }
            );

            if (res.status === 429) {
                dropdownEl.innerHTML = '<div class="search-no-result"><i class="fa-solid fa-clock" style="margin-right:6px"></i>API rate limiti asildi. Lutfen bekleyin...</div>';
                showFeedMsg('', '');
                return;
            }

            if (!res.ok) throw new Error('CoinGecko search error ' + res.status);
            const data = await res.json();
            const results = (data.coins || []).slice(0, 8);

            if (results.length === 0) {
                dropdownEl.innerHTML = '<div class="search-no-result">"' + query + '" icin coin bulunamadi.</div>';
                showFeedMsg('', '');
                return;
            }

            function esc(str) {
                return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
            }

            dropdownEl.innerHTML = results.map(function(c) {
                const sym = (c.symbol || '').toUpperCase();
                const thumbHtml = c.thumb
                    ? '<img src="' + esc(c.thumb) + '" class="search-result-thumb" alt="' + esc(sym) + '" onerror="this.style.display=\'none\'">'
                    : '<span class="search-result-thumb-placeholder"><i class="fa-solid fa-coins"></i></span>';
                const rankBadge = c.market_cap_rank
                    ? '<span class="search-result-rank">#' + c.market_cap_rank + '</span>'
                    : '';
                return '<div class="search-result-item" data-symbol="' + esc(sym) + '" data-name="' + encodeURIComponent(c.name || sym) + '" data-cgid="' + esc(c.id || '') + '" data-thumb="' + esc(c.thumb || '') + '">' +
                    thumbHtml +
                    '<div class="search-result-text"><span class="search-result-symbol">' + esc(sym) + '</span><span class="search-result-name">' + esc(c.name) + '</span></div>' +
                    rankBadge + '</div>';
            }).join('');

            dropdownEl.onclick = function(e) {
                const item = e.target.closest('.search-result-item');
                if (!item) return;
                const symbol = item.getAttribute('data-symbol');
                const name   = decodeURIComponent(item.getAttribute('data-name') || '');
                const cgid   = item.getAttribute('data-cgid');
                const thumb  = item.getAttribute('data-thumb');
                selectCoin(symbol, name, thumb, cgid);
            };

            showFeedMsg('', '');
        } catch (e) {
            if (e.name === 'AbortError') return;
            console.warn('[WhaleStack] Coin search failed:', e);
            dropdownEl.innerHTML = '<div class="search-no-result"><i class="fa-solid fa-triangle-exclamation" style="margin-right:6px"></i>Arama basarisiz. Tekrar dene.</div>';
            showFeedMsg('', '');
        }
    }, 400);
};

// ─── CoinGecko — Price Fetch ───────────────────────────────────────────────────
let isFetching = false;

async function fetchCoinGeckoPrices() {
    if (!isLeader) return;
    if (isFetching) return;

    const now = Date.now();
    if (now - lastFetchTime < MIN_FETCH_INTERVAL) return;

    const feeds = getAllFeeds();
    if (!feeds.length) return;

    const ids = feeds
        .map(function(f) { return f.coingeckoId || f.symbol.toLowerCase(); })
        .filter(Boolean)
        .join(',');

    if (!ids) return;

    isFetching = true;
    lastFetchTime = Date.now();

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(function() { controller.abort(); }, 10000);

        const res = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd&include_24hr_change=true',
            { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (res.status === 429) {
            fetchFailCount = Math.min(fetchFailCount + 1, 5);
            console.warn('[WhaleStack] CoinGecko rate limited (429). Backoff:', getBackoffDelay(), 'ms');
            updateLastUpdatedLabel(true);
            isFetching = false;
            return;
        }

        if (!res.ok) throw new Error('CoinGecko API ' + res.status);
        const data = await res.json();

        fetchFailCount = 0;

        const updates = [];
        feeds.forEach(function(f) {
            const cgId = f.coingeckoId || f.symbol.toLowerCase();
            const entry = data[cgId];
            if (!entry) return;
            const price     = entry.usd;
            const change24h = entry.usd_24h_change;
            if (price > 0) {
                applyPriceUpdate(f.symbol, price, change24h);
                updates.push({ symbol: f.symbol, price: price, change24h: change24h });
            }
        });

        if (updates.length > 0) {
            bc.postMessage({ type: 'PRICE_UPDATE', payload: updates });
        }

        updateLastUpdatedLabel(false);
    } catch (e) {
        if (e.name === 'AbortError') {
            console.warn('[WhaleStack] CoinGecko fetch timed out');
        } else {
            console.warn('[WhaleStack] CoinGecko price fetch failed', e);
        }
        fetchFailCount = Math.min(fetchFailCount + 1, 5);
        updateLastUpdatedLabel(true);
    } finally {
        isFetching = false;
    }
}

window.selectCoin = function (symbol, name, thumb, coingeckoId) {
    const custom = getCustomCoins();
    const cleanSymbol = (symbol || '').toUpperCase().trim();
    const cleanName   = (name || cleanSymbol).trim();

    if (!cleanSymbol) {
        showFeedMsg('Gecersiz coin sembolu!', 'error');
        return;
    }

    if (FIXED_FEEDS.some(function(f) { return f.symbol.toUpperCase() === cleanSymbol; })) {
        showFeedMsg(cleanSymbol + ' zaten listenizde!', 'error');
        return;
    }
    if (custom.some(function(c) { return c.symbol.toUpperCase() === cleanSymbol; })) {
        showFeedMsg(cleanSymbol + ' zaten listenizde!', 'error');
        return;
    }

    custom.push({
        symbol: cleanSymbol,
        name: cleanName,
        thumb: thumb || '',
        coingeckoId: coingeckoId || cleanSymbol.toLowerCase()
    });
    saveCustomCoins(custom);
    renderWatchlistItems();
    lastFetchTime = 0;
    fetchCoinGeckoPrices();
    closeAddCoinModal();
};

window.removeCustomCoin = function (symbol) {
    const custom = getCustomCoins().filter(function(c) { return c.symbol !== symbol; });
    saveCustomCoins(custom);

    if (memPrices && memPrices[symbol] !== undefined) {
        delete memPrices[symbol];
    }
    if (memChanges && memChanges[symbol] !== undefined) {
        delete memChanges[symbol];
    }

    flushCacheToStorage();
    renderWatchlistItems();
};

// ─── Modal Controls ────────────────────────────────────────────────────────────
window.openAddCoinModal = function () {
    const modal = document.getElementById('addCoinModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    const input    = document.getElementById('coinSearchInput');
    const dropdown = document.getElementById('coinSearchDropdown');
    const msg      = document.getElementById('feedFormMsg');
    if (input)    { input.value = ''; setTimeout(function() { input.focus(); }, 150); }
    if (dropdown) dropdown.classList.add('hidden');
    if (msg)      msg.textContent = '';
};

window.closeAddCoinModal = function () {
    const modal = document.getElementById('addCoinModal');
    if (modal) modal.classList.add('hidden');
    const dropdown = document.getElementById('coinSearchDropdown');
    if (dropdown) dropdown.classList.add('hidden');
    clearTimeout(searchTimer);
    if (searchAbortController) {
        searchAbortController.abort();
        searchAbortController = null;
    }
    showFeedMsg('', '');
};

function showFeedMsg(msg, type) {
    const el = document.getElementById('feedFormMsg');
    if (!el) return;
    el.textContent = msg;
    el.className = ('feed-form-msg ' + (type || '')).trim();
    if (type && type !== 'info' && msg) {
        setTimeout(function() { if (el.textContent === msg) el.textContent = ''; }, 4000);
    }
}

// ─── Inline Tool Viewer ────────────────────────────────────────────────────────
window.openTool = function (url, title) {
    const grid    = document.getElementById('toolsGrid');
    const viewer  = document.getElementById('toolViewer');
    const iframe  = document.getElementById('toolIframe');
    const titleEl = document.getElementById('toolViewerTitle');
    if (!grid || !viewer || !iframe) return;

    iframe.src = url;
    iframe.onload = function() {
        const isLight = document.body.classList.contains('light-mode');
        try { iframe.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: isLight ? 'light' : 'dark' }, '*'); } catch (e) {}
    };

    if (titleEl) titleEl.textContent = title || 'Financial Tool';
    document.title = (title || 'Tool') + ' — WhaleStack';
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

// ─── SPA Routing ───────────────────────────────────────────────────────────────
function handleRouting() {
    const hash = window.location.hash || '#tools';
    let pageId = 'tools';
    if (hash === '#about') pageId = 'about';
    else if (hash === '#links') pageId = 'links';

    document.querySelectorAll('.page-section').forEach(function(el) { el.classList.remove('active'); });
    document.querySelectorAll('.nav-btn').forEach(function(el) { el.classList.remove('active'); });

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    const targetLink = document.querySelector('.nav-btn[data-page="' + pageId + '"]');
    if (targetLink) targetLink.classList.add('active');

    if (pageId !== 'tools') closeTool();
}

// ─── Theme ─────────────────────────────────────────────────────────────────────
function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved  = localStorage.getItem('whalestack-theme');

    if (saved === 'light') {
        document.body.classList.add('light-mode');
        if (toggle) toggle.checked = true;
    }

    if (toggle) {
        toggle.addEventListener('change', function() {
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

// ─── Links Search ──────────────────────────────────────────────────────────────
window.filterMinimalLinks = function (query) {
    const q        = (query || '').toLowerCase().trim();
    const tiles    = document.querySelectorAll('.link-tile');
    const clearBtn = document.getElementById('linksClearBtn');
    if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);

    let visibleCount = 0;
    tiles.forEach(function(tile) {
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

// ─── App Init ──────────────────────────────────────────────────────────────────
function init() {
    setupTheme();
    handleRouting();
    renderWatchlistItems();

    const linkTiles    = document.querySelectorAll('.link-tile');
    const linksCountEl = document.getElementById('linksCount');
    if (linksCountEl && linkTiles.length > 0) {
        linksCountEl.textContent = linkTiles.length + ' Tools';
    }

    // Leader election: wait 500ms to see if another tab heartbeats first
    resetElectionTimeout();
    setTimeout(function() {
        if (!leaderHeartbeatReceived && !isLeader) {
            becomeLeader();
        }
    }, 500);

    // Poll every 8s (safe for CoinGecko free tier)
    if (pollingTimer) clearInterval(pollingTimer);
    pollingTimer = setInterval(function() {
        if (isLeader) {
            const backoff = getBackoffDelay();
            if (backoff > 0) {
                if (Date.now() - lastFetchTime >= backoff) {
                    fetchCoinGeckoPrices();
                }
            } else {
                fetchCoinGeckoPrices();
            }
        }
    }, 8000);

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && isLeader) {
            lastFetchTime = 0;
            fetchCoinGeckoPrices();
        }
    });

    const searchInput = document.getElementById('coinSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
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

    window.addEventListener('beforeunload', function() {
        flushCacheToStorage();
        if (isLeader && leaderPingTimer) clearInterval(leaderPingTimer);
    });

    window.addEventListener('hashchange', handleRouting);

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('addCoinModal');
            if (modal && !modal.classList.contains('hidden')) {
                closeAddCoinModal();
            } else if (activeTool) {
                closeTool();
            }
        }
    });

    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('coinSearchDropdown');
        const input    = document.getElementById('coinSearchInput');
        if (dropdown && input && !dropdown.contains(e.target) && e.target !== input) {
            dropdown.classList.add('hidden');
        }
    });

    window.addEventListener('message', function(e) {
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
