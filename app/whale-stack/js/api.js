// Fetch live prices from Pyth for all assets in portfolio
async function fetchPythPrices() {
    const ids = [];
    
    // Always fetch BTC and ETH prices for the live header ticker
    const btcCoin = apiCoins.find(c => c.symbol.toLowerCase() === 'btc');
    const ethCoin = apiCoins.find(c => c.symbol.toLowerCase() === 'eth');
    
    if (btcCoin && btcCoin.id && !ids.includes(btcCoin.id)) {
        ids.push(btcCoin.id);
    }
    if (ethCoin && ethCoin.id && !ids.includes(ethCoin.id)) {
        ids.push(ethCoin.id);
    }
    
    assets.forEach(a => {
        if (!a.isManual) {
            let feedId = a.coingeckoId;
            
            // Check in apiCoins
            const liveCoin = apiCoins.find(c => c.id === feedId || c.symbol.toLowerCase() === a.name.toLowerCase());
            if (liveCoin) {
                feedId = liveCoin.id;
            }
            
            if (feedId && !ids.includes(feedId)) {
                ids.push(feedId);
            }
        }
    });

    watchlist.forEach(w => {
        let feedId = w.coingeckoId;

        const liveCoin = apiCoins.find(c => c.id === feedId || c.symbol.toLowerCase() === w.name.toLowerCase());
        if (liveCoin) {
            feedId = liveCoin.id;
        }

        if (feedId && !ids.includes(feedId)) {
            ids.push(feedId);
        }
    });

    // Fetch Pyth Prices
    if (ids.length > 0) {
        try {
            const query = ids.map(id => `ids[]=${id}`).join('&');
            const res = await fetch(`https://hermes.pyth.network/v2/updates/price/latest?${query}`);
            if (res.ok) {
                const json = await res.json();
                if (json && Array.isArray(json.parsed)) {
                    json.parsed.forEach(item => {
                        const priceVal = parseFloat(item.price.price) * Math.pow(10, item.price.expo);
                        pythPrices[item.id] = priceVal;
                    });
                }
            }
        } catch (e) {
            console.error('Error fetching Pyth prices:', e);
        }
    }

    // Update prices in the header ticker widget
    updateHeaderPrices();
}

// Load coins list using Pyth Network price feeds with caching
async function loadApiCoins(forceRefresh = false) {
    const cacheTime = localStorage.getItem('whalestack_api_coins_timestamp');
    const now = Date.now();
    
    if (!forceRefresh && cacheTime && (now - parseInt(cacheTime)) < 12 * 60 * 60 * 1000) { // Cache feeds list for 12 hours
        const cachedData = localStorage.getItem('whalestack_api_coins');
        if (cachedData) {
            try {
                apiCoins = JSON.parse(cachedData);
                console.log('Loaded Pyth feeds list from cache. Count:', apiCoins.length);
                return;
            } catch(e) {
                console.error('Error parsing cached coins:', e);
            }
        }
    }

    setRefreshButtonLoading(true);
    let success = false;
    let coingeckoMap = {};

    // Pre-fetch CoinGecko top 250 coins to build an official logo map (to bypass rate limit & leverage cache)
    try {
        console.log('Fetching CoinGecko top coins for high-quality logos...');
        const cgRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1');
        if (cgRes.ok) {
            const cgData = await cgRes.json();
            if (Array.isArray(cgData)) {
                cgData.forEach(coin => {
                    if (coin.symbol && coin.image) {
                        coingeckoMap[coin.symbol.toLowerCase()] = coin.image;
                    }
                });
                console.log('Successfully loaded CoinGecko logo map. Count:', Object.keys(coingeckoMap).length);
            }
        }
    } catch (e) {
        console.warn('Failed to pre-fetch CoinGecko image map (will use fallback local 404):', e);
    }

    // --- Provider: Pyth Network Hermes v2/price_feeds ---
    try {
        console.log('Trying Pyth Network API...');
        const res = await fetch('https://hermes.pyth.network/v2/price_feeds?asset_type=crypto');
        if (!res.ok) throw new Error('Pyth response not ok');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            apiCoins = data
                .filter(coin => 
                    coin.attributes && 
                    coin.attributes.asset_type && 
                    coin.attributes.asset_type.toLowerCase() === 'crypto' &&
                    coin.attributes.quote_currency &&
                    coin.attributes.quote_currency.toLowerCase() === 'usd' &&
                    !(coin.attributes.description && coin.attributes.description.toLowerCase().includes('deprecated'))
                )
                .map(coin => {
                    const symbol = coin.attributes.base.toLowerCase();
                    let name = coin.attributes.description || coin.attributes.symbol || symbol.toUpperCase();
                    name = name.replace(' / US DOLLAR', '').replace('DEPRECATED FEED - ', '');
                    
                    return {
                        id: coin.id,
                        symbol: symbol,
                        name: name,
                        image: coingeckoMap[symbol] || `img/404.png`,
                        current_price: 0,
                        circulating_supply: 0,
                        max_supply: 0,
                        isPyth: true
                    };
                });
            success = true;
            console.log('Successfully fetched from Pyth Network. Count:', apiCoins.length);
            showToast('Pyth Network price feed list successfully updated.');
        }
    } catch (e) {
        console.warn('Pyth feeds fetch failed.', e);
    }

    if (success) {
        localStorage.setItem('whalestack_api_coins', JSON.stringify(apiCoins));
        localStorage.setItem('whalestack_api_coins_timestamp', String(now));
    } else {
        showToast('API connection error. Using cached data.', true);
        const cachedData = localStorage.getItem('whalestack_api_coins');
        if (cachedData) {
            try {
                apiCoins = JSON.parse(cachedData);
            } catch(err) {
                console.error(err);
            }
        }
    }
    setRefreshButtonLoading(false);
}

