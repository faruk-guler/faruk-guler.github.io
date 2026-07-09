const form = document.getElementById('calcForm');
if (form) {
    form.addEventListener('submit', calculateProfit);
}

function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (!errorEl) return;
    errorEl.textContent = '❌ ' + message;
    errorEl.style.display = 'block';
    const successEl = document.getElementById('successMessage');
    if (successEl) successEl.style.display = 'none';
    setTimeout(() => {
        errorEl.style.display = 'none';
    }, 4000);
}

function showSuccess(message) {
    const successEl = document.getElementById('successMessage');
    if (!successEl) return;
    successEl.textContent = '✅ ' + message;
    successEl.style.display = 'block';
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) errorEl.style.display = 'none';
    setTimeout(() => {
        successEl.style.display = 'none';
    }, 3000);
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

function calculateProfit(event) {
    event.preventDefault();

    const coinName = document.getElementById('coinName').value.trim();
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);

    if (!coinName) {
        showError('Please enter an asset symbol!');
        return;
    }

    if (isNaN(buyPrice) || isNaN(investmentAmount) || isNaN(sellPrice)) {
        showError('Please enter valid numbers!');
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

    document.getElementById('resultCoinName').textContent = coinName.toUpperCase();

    const profitLossElement = document.getElementById('resultProfitLoss');
    profitLossElement.textContent = (profitLoss >= 0 ? '+' : '') + formatPrice(profitLoss) + ' USD';
    profitLossElement.className = profitLoss > 0 ? 'profit' : (profitLoss < 0 ? 'loss' : 'neutral');

    const percentageElement = document.getElementById('resultProfitLossPercentage');
    percentageElement.textContent = (profitLossPercentage >= 0 ? '+' : '') + profitLossPercentage.toFixed(2) + '%';
    percentageElement.className = profitLossPercentage > 0 ? 'profit' : (profitLossPercentage < 0 ? 'loss' : 'neutral');

    const multiplierElement = document.getElementById('resultMultiplier');
    multiplierElement.textContent = (multiplier >= 1 ? '+' : '') + multiplier.toFixed(2) + 'x';
    multiplierElement.className = multiplier > 1 ? 'profit' : (multiplier < 1 ? 'loss' : 'neutral');

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
    showSuccess('Calculation completed successfully!');
}

function clearForm() {
    document.getElementById('calcForm').reset();
    document.getElementById('result').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('coinName').focus();
}

function loadThemePreference() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('whalestack-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.checked = true;
    } else {
        document.body.classList.remove('light-mode');
        if (themeToggle) themeToggle.checked = false;
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

loadThemePreference();
setupThemeToggle();
