// State
let assets = [];
let watchlist = [];
let editingId = null;
const activeCurrency = 'USD';
let usdTryRate = 1;
let apiCoins = [];
let selectedApiCoin = null;
let pythPrices = {}; // Global store for Pyth oracle prices
let priceRefreshInterval = null; // Auto refresh timer


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


// Validate and sanitize imported portfolio assets
function validateAssets(data) {
    if (!Array.isArray(data)) return null;
    
    const validated = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item && typeof item === 'object') {
            const name = typeof item.name === 'string' ? item.name.trim().toUpperCase() : '';
            if (!name) continue; // Skip items without a name
            
            const amount = parseFloat(item.amount);
            const price = parseFloat(item.price);
            
            if (isNaN(amount) || amount < 0 || isNaN(price) || price < 0) {
                continue;
            }

            const isManual = item.isManual === true || item.isManual === "true" || (!item.coingeckoId && item.currentPrice !== undefined);
            let currentPrice = '';
            
            if (isManual) {
                const curPriceVal = parseFloat(item.currentPrice);
                if (isNaN(curPriceVal) || curPriceVal < 0) {
                    continue; // Skip invalid manual items
                }
                currentPrice = String(item.currentPrice);
            }
            
            const circSupply = item.circSupply !== undefined && item.circSupply !== null && item.circSupply !== '' ? String(item.circSupply).trim() : '';
            const maxSupply = item.maxSupply !== undefined && item.maxSupply !== null && item.maxSupply !== '' ? String(item.maxSupply).trim() : '';
            
            validated.push({
                id: item.id ? String(item.id) : (Date.now() + i).toString(),
                name: name,
                amount: String(item.amount),
                price: String(item.price),
                currentPrice: currentPrice,
                circSupply: circSupply,
                maxSupply: maxSupply,
                color: (item.color === 'medium' || item.color === 'high') ? item.color : 'low',
                isManual: isManual,
                coingeckoId: item.coingeckoId ? String(item.coingeckoId) : '',
                lastEdit: item.lastEdit || getCurrentDateFormatted()
            });
        }
    }
    return validated.length > 0 ? validated : null;
}


function loadWatchlist() {
    const saved = localStorage.getItem('cryptoWatchlist');
    if (saved) {
        try {
            watchlist = JSON.parse(saved);
        } catch(e) {
            console.error('Error parsing watchlist:', e);
            watchlist = [];
        }
    }
}

function saveWatchlist() {
    try {
        localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
    } catch(e) {
        console.error('Error saving watchlist:', e);
    }
}
