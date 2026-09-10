// WhaleStack — CoinGecko Market Data & Dynamic Watchlist

let activeTool = null;
let priceInterval = null;
let isFetching = false;
let isRefreshing = false;

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

function getAllFeeds() {
    return [...FIXED_FEEDS, ...getCustomCoins()];
}

function getCachedPrices() {
    try {
        return JSON.parse(localStorage.getItem('whalestack_prices') || '{}');
    } catch (e) { return {}; }
}

// ─── Watchlist Render ─────────────────────────────────────────────────────────

function renderWatchlistItems() {
    const container = document.getElementById('watchlistItems');
    if (!container) return;

    const customCoins  = getCustomCoins();
    const cachedPrices = getCachedPrices();
    let html = '';

    // Fixed feeds (BTC & ETH — no delete button)
    FIXED_FEEDS.forEach(coin => {
        const priceDisplay = formatPrice(cachedPrices[coin.symbol] || 0);
        const logoHtml = coin.thumb
            ? `<img src="${coin.thumb}" class="watchlist-coin-logo" alt="${coin.symbol}" onerror="this.style.display='none'">`
            : `<span class="watchlist-coin-logo-fallback"><i class="fa-solid fa-coins"></i></span>`;
        html += `
            <div class="watchlist-row fixed-row">
                <div class="watchlist-coin-info">
                    ${logoHtml}
                    <div class="watchlist-coin-names">
                        <span class="watchlist-coin-symbol">${coin.symbol}</span>
                        <span class="watchlist-coin-fullname">${coin.name}</span>
                    </div>
                </div>
                <div class="watchlist-coin-right">
                    <span class="watchlist-coin-price" id="dropPrice_${coin.symbol}">${priceDisplay}</span>
                </div>
            </div>`;
    });

    // Custom coins (with delete button)
    customCoins.forEach(coin => {
        const priceDisplay = formatPrice(cachedPrices[coin.symbol] || 0);
        const logoHtml = coin.thumb
            ? `<img src="${coin.thumb}" class="watchlist-coin-logo" alt="${coin.symbol}" onerror="this.style.display='none'">`
            : `<span class="watchlist-coin-logo-fallback"><i class="fa-solid fa-coins"></i></span>`;
        html += `
            <div class="watchlist-row custom-row">
                <div class="watchlist-coin-info">
                    ${logoHtml}
                    <div class="watchlist-coin-names">
                        <span class="watchlist-coin-symbol">${coin.symbol}</span>
                        <span class="watchlist-coin-fullname">${coin.name}</span>
                    </div>
                </div>
                <div class="watchlist-coin-right">
                    <span class="watchlist-coin-price" id="dropPrice_${coin.symbol}">${priceDisplay}</span>
                    <button type="button" onclick="removeCustomCoin('${coin.symbol}')" class="coin-delete-btn" title="Remove ${coin.symbol}">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>`;
    });

    container.innerHTML = html;
}

// ─── CoinGecko — Price Fetching ───────────────────────────────────────────────

async function fetchCoinGeckoPrices(forceFlash = false) {
    if (isFetching) return;
    isFetching = true;

    try {
        const allFeeds = getAllFeeds();
        const ids = allFeeds.map(f => f.cgId).filter(Boolean).join(',');
        if (!ids) return;

        const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
            { headers: { 'Accept': 'application/json' } }
        );
        if (res.status === 429) {
            if (forceFlash) showRateLimitNotice();
            return;
        }
        if (!res.ok) return;

        const data = await res.json();
        const prices = getCachedPrices();

        allFeeds.forEach(feed => {
            const price = data[feed.cgId]?.usd;
            if (price && price > 0) prices[feed.symbol] = price;
        });

        localStorage.setItem('whalestack_prices', JSON.stringify(prices));

        // Live DOM update with flash animation
        allFeeds.forEach(feed => {
            const el = document.getElementById(`dropPrice_${feed.symbol}`);
            if (!el) return;
            const formatted = formatPrice(prices[feed.symbol] || 0);
            const changed = el.textContent !== formatted;
            el.textContent = formatted;

            if ((changed || forceFlash) && prices[feed.symbol] > 0) {
                el.classList.remove('price-updated');
                // trigger reflow for smooth re-animation
                void el.offsetWidth;
                el.classList.add('price-updated');
                setTimeout(() => el.classList.remove('price-updated'), 1200);
            }
        });
    } catch (e) {
        // Silently fail — cached prices remain displayed
    } finally {
        isFetching = false;
    }
}

function showRateLimitNotice() {
    const btn = document.getElementById('marketRefreshBtn');
    if (btn) {
        const oldTitle = btn.title;
        btn.title = 'Rate limit reached. Please wait ~30s.';
        btn.style.color = '#ef4444';
        setTimeout(() => {
            btn.title = oldTitle;
            btn.style.color = '';
        }, 3000);
    }
}

// User-triggered manual refresh
window.refreshPrices = function () {
    if (isRefreshing || isFetching) return;
    isRefreshing = true;
    const btn = document.getElementById('marketRefreshBtn');
    if (btn) btn.classList.add('spinning');
    fetchCoinGeckoPrices(true).finally(() => {
        setTimeout(() => {
            isRefreshing = false;
            if (btn) btn.classList.remove('spinning');
        }, 800);
    });
};

// ─── CoinGecko — Coin Search ──────────────────────────────────────────────────

let searchTimer = null;

window.handleCoinSearch = function (val) {
    clearTimeout(searchTimer);
    const dropdown = document.getElementById('coinSearchDropdown');
    const query = (val || '').trim();

    if (query.length < 2) {
        if (dropdown) dropdown.classList.add('hidden');
        return;
    }

    showFeedMsg('Searching...', 'info');

    searchTimer = setTimeout(async () => {
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
                { headers: { 'Accept': 'application/json' } }
            );
            if (!res.ok) { showFeedMsg('Search failed. Try again.', 'error'); return; }

            const data = await res.json();
            const coins = (data.coins || []).slice(0, 8);

            if (!dropdown) return;

            if (coins.length === 0) {
                dropdown.innerHTML = `<div class="search-no-result">No coins found for "${query}"</div>`;
                dropdown.classList.remove('hidden');
                showFeedMsg('', '');
                return;
            }

            dropdown.innerHTML = coins.map(c => {
                const rank = c.market_cap_rank ? `<span class="search-result-rank">#${c.market_cap_rank}</span>` : '';
                const thumbUrl = (c.thumb && !c.thumb.includes('missing')) ? c.thumb : '';
                const thumbHtml = thumbUrl
                    ? `<img src="${thumbUrl}" class="search-result-thumb" alt="" onerror="this.style.display='none'">`
                    : `<span class="search-result-thumb-placeholder"><i class="fa-solid fa-coins"></i></span>`;
                return `
                    <div class="search-result-item" data-id="${c.id}" data-symbol="${c.symbol.toUpperCase()}" data-name="${encodeURIComponent(c.name)}" data-thumb="${encodeURIComponent(thumbUrl)}">
                        ${thumbHtml}
                        <div class="search-result-text">
                            <span class="search-result-symbol">${c.symbol.toUpperCase()}</span>
                            <span class="search-result-name">${c.name}</span>
                        </div>
                        ${rank}
                    </div>`;
            }).join('');

            dropdown.onclick = (e) => {
                const item = e.target.closest('.search-result-item');
                if (!item) return;
                const cgId = item.getAttribute('data-id');
                const symbol = item.getAttribute('data-symbol');
                const name = decodeURIComponent(item.getAttribute('data-name') || '');
                const thumb = decodeURIComponent(item.getAttribute('data-thumb') || '');
                selectCoin(cgId, symbol, name, thumb);
            };

            dropdown.classList.remove('hidden');
            showFeedMsg('', '');
        } catch (e) {
            showFeedMsg('Connection error. Try again.', 'error');
        }
    }, 350);
};

window.selectCoin = function (cgId, symbol, name, thumb) {
    const custom = getCustomCoins();

    if (FIXED_FEEDS.some(f => f.symbol === symbol)) {
        showFeedMsg(`${symbol} is already in your watchlist!`, 'error');
        return;
    }
    if (custom.some(c => c.symbol === symbol)) {
        showFeedMsg(`${symbol} is already in your watchlist!`, 'error');
        return;
    }

    custom.push({ symbol, name, cgId, thumb: thumb || '' });
    saveCustomCoins(custom);
    renderWatchlistItems();
    fetchCoinGeckoPrices();
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
    fetchCoinGeckoPrices();

    // Dynamic link counter
    const linkTiles    = document.querySelectorAll('.link-tile');
    const linksCountEl = document.getElementById('linksCount');
    if (linksCountEl && linkTiles.length > 0) {
        linksCountEl.textContent = linkTiles.length + ' Tools';
    }

    // Auto-refresh every 30s (CoinGecko rate-limit friendly)
    priceInterval = setInterval(() => {
        if (document.visibilityState === 'visible') fetchCoinGeckoPrices();
    }, 30000);

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
