const form = document.getElementById('calcForm');
if (form) {
    form.addEventListener('submit', calculateProfit);
}

function parseNum(val) {
    if (val === null || val === undefined) return NaN;
    const str = String(val).trim().replace(',', '.');
    return parseFloat(str);
}

function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (!errorEl) return;
    errorEl.textContent = '❌ ' + message;
    errorEl.style.display = 'block';
    const successEl = document.getElementById('successMessage');
    if (successEl) successEl.style.display = 'none';
    setTimeout(() => {
        if (errorEl.textContent.includes(message)) {
            errorEl.style.display = 'none';
        }
    }, 4000);
}


function formatPrice(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0.00';
    if (num === 0) return '0.00';
    const abs = Math.abs(num);
    if (abs < 0.01) {
        let str = num.toFixed(10).replace(/0+$/, '').replace(/\.$/, '');
        if (str.includes('.')) {
            const [int, dec] = str.split('.');
            return int + '.' + (dec.length > 8 ? dec.substring(0, 8) : dec);
        }
        return str;
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(num);
}

function formatQuantity(num) {
    if (typeof num !== 'number' || isNaN(num) || num <= 0) return '0';
    if (num >= 1000) {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num);
    }
    let str = num.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
    return str;
}

function calculateProfit(event) {
    if (event) event.preventDefault();

    const rawCoinName = document.getElementById('coinName').value.trim();
    const coinName = rawCoinName ? rawCoinName.toUpperCase() : 'ASSET';
    const buyPrice = parseNum(document.getElementById('buyPrice').value);
    const investmentAmount = parseNum(document.getElementById('investmentAmount').value);
    const sellPrice = parseNum(document.getElementById('sellPrice').value);

    if (isNaN(buyPrice) || isNaN(investmentAmount) || isNaN(sellPrice)) {
        showError('Please enter valid numeric values for Buy Price, Investment, and Sell Price!');
        return;
    }

    if (buyPrice <= 0) {
        showError('Buy price must be greater than 0!');
        return;
    }

    if (sellPrice <= 0) {
        showError('Sell price must be greater than 0!');
        return;
    }

    if (investmentAmount <= 0) {
        showError('Investment amount must be greater than 0!');
        return;
    }

    const quantity = investmentAmount / buyPrice;
    const exitAmount = quantity * sellPrice;
    const profitLoss = exitAmount - investmentAmount;
    const profitLossPercentage = (profitLoss / investmentAmount) * 100;
    const multiplier = (exitAmount / investmentAmount);

    document.getElementById('resultCoinName').textContent = coinName;
    document.getElementById('resultQuantity').textContent = formatQuantity(quantity) + (coinName !== 'ASSET' ? ` ${coinName}` : '');

    const profitLossElement = document.getElementById('resultProfitLoss');
    profitLossElement.textContent = (profitLoss >= 0 ? '+' : '') + formatPrice(profitLoss) + ' USD';
    profitLossElement.className = 'result-value ' + (profitLoss > 0 ? 'profit' : (profitLoss < 0 ? 'loss' : 'neutral'));

    const percentageElement = document.getElementById('resultProfitLossPercentage');
    percentageElement.textContent = (profitLossPercentage >= 0 ? '+' : '') + profitLossPercentage.toFixed(2) + '%';
    percentageElement.className = 'result-value ' + (profitLossPercentage > 0 ? 'profit' : (profitLossPercentage < 0 ? 'loss' : 'neutral'));

    const multiplierElement = document.getElementById('resultMultiplier');
    multiplierElement.textContent = multiplier.toFixed(2) + 'x';
    multiplierElement.className = 'result-value ' + (multiplier > 1 ? 'profit' : (multiplier < 1 ? 'loss' : 'neutral'));

    document.getElementById('resultInvestmentAmount').textContent = formatPrice(investmentAmount);
    document.getElementById('resultExitAmount').textContent = formatPrice(exitAmount);

    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('profit-result', 'loss-result', 'neutral-result');

    if (profitLoss > 0) {
        resultDiv.classList.add('profit-result');
    } else if (profitLoss < 0) {
        resultDiv.classList.add('loss-result');
    } else {
        resultDiv.classList.add('neutral-result');
    }

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearForm() {
    document.getElementById('calcForm').reset();
    document.getElementById('result').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('buyPrice').focus();
}

function copyProfitLoss() {
    const plEl = document.getElementById('resultProfitLoss');
    const iconEl = document.getElementById('copyPlIcon');
    if (!plEl || !plEl.textContent || plEl.textContent === '-') return;

    const textToCopy = plEl.textContent.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
        if (iconEl) {
            iconEl.className = 'fa-solid fa-check';
            iconEl.style.color = '#2ea043';
            setTimeout(() => {
                iconEl.className = 'fa-regular fa-copy';
                iconEl.style.color = '';
            }, 2000);
        }
    }).catch(() => {});
}

// Prevent accidental wheel scroll value increments
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('wheel', (e) => e.target.blur(), { passive: true });
});

// Theme Management & Live Parent Sync
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

// Initial theme load
applyTheme(localStorage.getItem('whalestack-theme') || 'dark');

// Live message listener from main WhaleStack app
window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'THEME_CHANGE') {
        applyTheme(e.data.theme);
    }
});
