// WhaleStack — Real-Time Market Data (CoinGecko API)

let activeTool    = null;
let labelInterval = null;
let pollingTimer  = null; // periodic CoinGecko price refresh

// ─── Broadcast Channel (Leader Election) ───────────────
const bc = new BroadcastChannel('whalestack_leader');
let isLeader = true;
let leaderPingTimer = null;
let electionTimeout = null;

function becomeLeader() {
    isLeader = true;
    if (leaderPingTimer) clearInterval(leaderPingTimer);
    leaderPingTimer = setInterval(() => {
        bc.postMessage({ type: 'HEARTBEAT' });
    }, 2000);
}

function startElectionTimeout() {
    if (electionTimeout) clearTimeout(electionTimeout);
    electionTimeout = setTimeout(() => {
        // No leader heartbeat received, become leader
        becomeLeader();
        fetchCoinGeckoPrices(); // Fetch immediately upon becoming leader
    }, 3500);
}

bc.onmessage = (event) => {
    if (event.data.type === 'HEARTBEAT') {
        isLeader = false;
        if (leaderPingTimer) clearInterval(leaderPingTimer);
        startElectionTimeout();
    } else if (event.data.type === 'PRICE_UPDATE') {
        // Apply prices received from leader
        const updates = event.data.payload;
        updates.forEach(u => applyPriceUpdate(u.symbol, u.price, u.change24h));
        updateLastUpdatedLabel(false);
    }
};

// Initialize election
startElectionTimeout();
becomeLeader(); // Assume leader initially, will yield if another heartbeat arrives
// ────────────────────────────────────────────────────────

// Fixed Core Feeds (CoinGecko ID + thumb included)
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


// ─── Formatters ──────────────────────────────────────────────────────────────

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
let memChanges = null; // 24h change % cache
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
        const cachedChanges = getCachedChanges();
        const change24h    = cachedChanges[coin.symbol];
        const hasChange    = typeof change24h === 'number' && !isNaN(change24h);
        const changeClass  = hasChange ? (change24h >= 0 ? 'change-positive' : 'change-negative') : 'change-neutral';
        const changeText   = hasChange ? (change24h >= 0 ? '+' : '') + change24h.toFixed(2) + '%' : '';
        const changeBadge  = changeText
            ? `<span class="watchlist-change ${changeClass}" id="dropChange_${coin.symbol}">${changeText}</span>`
            : `<span class="watchlist-change change-neutral" id="dropChange_${coin.symbol}"></span>`;

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

// ─── CoinGecko — Price Fetch & Label ──────────────────────────────────────────

function applyPriceUpdate(symbol, price, change24h, forceFlash = false) {
    if (!price || price <= 0) return;
    const prices = getCachedPrices();
    prices[symbol] = price;

    if (typeof change24h === 'number' && !isNaN(change24h)) {
        const changes = getCachedChanges();
        changes[symbol] = change24h;
    }

    scheduleStorageSave();

    const el = document.getElementById(`dropPrice_${symbol}`);
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
        const chEl = document.getElementById(`dropChange_${symbol}`);
        if (chEl) {
            const sign = change24h >= 0 ? '+' : '';
            chEl.textContent = sign + change24h.toFixed(2) + '%';
            chEl.className = 'watchlist-change ' + (change24h >= 0 ? 'change-positive' : 'change-negative');
        }
    }
}

function updateLastUpdatedLabel(isError = false) {
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
    if (searchAbortController) searchAbortController.abort();
    
    const dropdown = document.getElementById('coinSearchDropdown');
    const query = (val || '').trim();

    if (query.length < 2) {
        if (dropdown) dropdown.classList.add('hidden');
        showFeedMsg('', '');
        return;
    }

    showFeedMsg('CoinGecko\'da aranıyor...', 'info');

    searchTimer = setTimeout(async () => {
        const modal = document.getElementById('addCoinModal');
        if (!modal || modal.classList.contains('hidden')) return;

        const dropdownEl = document.getElementById('coinSearchDropdown');
        if (!dropdownEl) return;

        // Show loading spinner immediately
        dropdownEl.innerHTML = `<div class="search-no-result"><i class="fa-solid fa-spinner fa-spin" style="margin-right:6px"></i>Yükleniyor...</div>`;
        dropdownEl.classList.remove('hidden');

        searchAbortController = new AbortController();
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
                { signal: searchAbortController.signal }
            );
            if (!res.ok) throw new Error('CoinGecko search error ' + res.status);
            const data = await res.json();

            const results = (data.coins || []).slice(0, 8);

            if (results.length === 0) {
                dropdownEl.innerHTML = `<div class="search-no-result">"${query}" için coin bulunamadı.</div>`;
                showFeedMsg('', '');
                return;
            }

            const esc = str => String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

            dropdownEl.innerHTML = results.map(c => {
                const sym = (c.symbol || '').toUpperCase();
                const thumbHtml = c.thumb
                    ? `<img src="${esc(c.thumb)}" class="search-result-thumb" alt="${esc(sym)}" onerror="this.style.display='none'">`
                    : `<span class="search-result-thumb-placeholder"><i class="fa-solid fa-coins"></i></span>`;
                const rankBadge = c.market_cap_rank
                    ? `<span class="search-result-rank">#${c.market_cap_rank}</span>`
                    : '';
                return `
                    <div class="search-result-item"
                         data-symbol="${esc(sym)}"
                         data-name="${encodeURIComponent(c.name || sym)}"
                         data-cgid="${esc(c.id || '')}"
                         data-thumb="${esc(c.thumb || '')}">
                        ${thumbHtml}
                        <div class="search-result-text">
                            <span class="search-result-symbol">${esc(sym)}</span>
                            <span class="search-result-name">${esc(c.name)}</span>
                        </div>
                        ${rankBadge}
                    </div>`;
            }).join('');

            dropdownEl.onclick = (e) => {
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
            if (e.name === 'AbortError') return; // Ignore aborted requests
            dropdownEl.innerHTML = `<div class="search-no-result"><i class="fa-solid fa-triangle-exclamation" style="margin-right:6px"></i>Arama başarısız. Tekrar dene.</div>`;
            showFeedMsg('', '');
        }
    }, 350);
};

// ─── CoinGecko — REST Quotes (5s polling) ─────────────────────────────────────

async function fetchCoinGeckoPrices() {
    if (!isLeader) return; // Only leader fetches data
    
    const feeds = getAllFeeds();
    if (!feeds.length) return;

    // Collect all CoinGecko IDs (fallback: lowercase symbol as guess)
    const ids = feeds
        .map(f => f.coingeckoId || f.symbol.toLowerCase())
        .filter(Boolean)
        .join(',');

    if (!ids) return;

    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
            { signal: AbortSignal.timeout(8000) }
        );
        if (!res.ok) throw new Error('CoinGecko API ' + res.status);
        const data = await res.json();

        const updates = [];
        feeds.forEach(f => {
            const cgId = f.coingeckoId || f.symbol.toLowerCase();
            const entry = data[cgId];
            if (!entry) return;
            const price    = entry.usd;
            const change24h = entry.usd_24h_change; // Already in %, e.g. 2.74
            if (price > 0) {
                applyPriceUpdate(f.symbol, price, change24h);
                updates.push({ symbol: f.symbol, price, change24h });
            }
        });

        // Broadcast to other tabs
        if (updates.length > 0) {
            bc.postMessage({ type: 'PRICE_UPDATE', payload: updates });
        }

        updateLastUpdatedLabel(false);
    } catch (e) {
        console.warn('[WhaleStack] CoinGecko price fetch failed', e);
        updateLastUpdatedLabel(true);
    }
}

window.selectCoin = function (symbol, name, thumb, coingeckoId) {
    const custom = getCustomCoins();
    const cleanSymbol = (symbol || '').toUpperCase().trim();
    const cleanName   = (name || cleanSymbol).trim();

    if (FIXED_FEEDS.some(f => f.symbol.toUpperCase() === cleanSymbol)) {
        showFeedMsg(`${cleanSymbol} zaten listenizde!`, 'error');
        return;
    }
    if (custom.some(c => c.symbol.toUpperCase() === cleanSymbol)) {
        showFeedMsg(`${cleanSymbol} zaten listenizde!`, 'error');
        return;
    }

    // Save with CoinGecko ID + thumb so polling works correctly
    custom.push({
        symbol: cleanSymbol,
        name: cleanName,
        thumb: thumb || '',
        coingeckoId: coingeckoId || cleanSymbol.toLowerCase()
    });
    saveCustomCoins(custom);
    renderWatchlistItems();
    fetchCoinGeckoPrices(); // Immediately refresh prices for new coin
    closeAddCoinModal();
};

window.removeCustomCoin = function (symbol) {
    const custom = getCustomCoins().filter(c => c.symbol !== symbol);
    saveCustomCoins(custom);
    try {
        const prices = getCachedPrices();
        delete prices[symbol];
        localStorage.setItem('whalestack_prices', JSON.stringify(prices));
    } catch (e) {}
    try {
        const changes = getCachedChanges();
        delete changes[symbol];
        localStorage.setItem('whalestack_changes', JSON.stringify(changes));
    } catch (e) {}
    renderWatchlistItems();
};

// ─── Modal Controls ───────────────────────────────────────────────────────────

window.openAddCoinModal = function () {
    const modal = document.getElementById('addCoinModal');
    if (!modal) return;
    modal.classList.remove('hidden');
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

    // Initial fetch of all coin prices via CoinGecko
    fetchCoinGeckoPrices();

    // Poll every 5 seconds (CoinGecko free tier: up to ~30 req/min, 1 req/5s = 12 req/min ✔)
    if (pollingTimer) clearInterval(pollingTimer);
    pollingTimer = setInterval(() => {
        if (isLeader) fetchCoinGeckoPrices();
    }, 5000);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && isLeader) {
            fetchCoinGeckoPrices();
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

    // Flush in-memory caches on tab close
    window.addEventListener('beforeunload', () => {
        if (memPrices) {
            try { localStorage.setItem('whalestack_prices', JSON.stringify(memPrices)); } catch (e) {}
        }
        if (memChanges) {
            try { localStorage.setItem('whalestack_changes', JSON.stringify(memChanges)); } catch (e) {}
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
