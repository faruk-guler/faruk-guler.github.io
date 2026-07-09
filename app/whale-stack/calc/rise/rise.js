const formatUSD = (num) => {
    if (typeof num !== 'number' || isNaN(num) || num < 0) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: "compact",
        maximumFractionDigits: 2
    }).format(num);
};

const formatPrice = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return '---';
    if (num === 0) return '$0.00';
    if (num < 0.01 && num > 0) {
        let str = num.toFixed(10).replace(/0+$/, '').replace(/\.$/, '');
        if (str.includes('.')) {
            const [int, dec] = str.split('.');
            return '$' + int + '.' + (dec.length > 8 ? dec.substring(0, 8) : dec);
        }
        return '$' + str;
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(num);
};

function calculate() {
    const sName = document.getElementById('sName').value || 'Asset';
    const tName = document.getElementById('tName').value || 'Competitor';

    const sPrice = parseFloat(document.getElementById('sPrice').value);
    const sInputVal = parseFloat(document.getElementById('sSupplyInput').value);
    const sMultiplier = parseFloat(document.getElementById('sUnit').value);
    const sSupply = sInputVal * sMultiplier;

    const tPrice = parseFloat(document.getElementById('tPrice').value);
    const tInputVal = parseFloat(document.getElementById('tSupplyInput').value);
    const tMultiplier = parseFloat(document.getElementById('tUnit').value);
    const tSupply = tInputVal * tMultiplier;

    if (
        isNaN(sPrice) || isNaN(sSupply) || isNaN(tPrice) || isNaN(tSupply) ||
        sPrice <= 0 || sSupply <= 0 || tPrice <= 0 || tSupply <= 0
    ) {
        document.getElementById('resultArea').style.display = 'none';
        document.getElementById('sMC').innerText = 'Market Cap: $0';
        document.getElementById('tMC').innerText = 'Target Market Cap: $0';
        return;
    }

    const sMC = sPrice * sSupply;
    const tMC = tPrice * tSupply;

    document.getElementById('sMC').innerText = `Market Cap: ${formatUSD(sMC)}`;
    document.getElementById('tMC').innerText = `Target Market Cap: ${formatUSD(tMC)}`;

    const targetPrice = tMC / sSupply;
    const multiplier = targetPrice / sPrice;
    const percent = (multiplier - 1) * 100;

    const resultArea = document.getElementById('resultArea');
    resultArea.style.display = 'block';
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    document.getElementById('resName').innerText = sName;
    document.getElementById('resTargetName').innerText = tName;
    document.getElementById('resPrice').innerText = formatPrice(targetPrice);
    document.getElementById('resX').innerText = multiplier.toFixed(2) + 'x';
    document.getElementById('resPercent').innerText = (percent >= 0 ? '+' : '') + percent.toLocaleString('en-US', { maximumFractionDigits: 0 }) + '%';
    document.getElementById('resTargetMC').innerText = formatUSD(tMC);
}

function clearForm() {
    document.getElementById('sName').value = '';
    document.getElementById('sPrice').value = '';
    document.getElementById('sSupplyInput').value = '';
    document.getElementById('tName').value = '';
    document.getElementById('tPrice').value = '';
    document.getElementById('tSupplyInput').value = '';
    document.getElementById('resultArea').style.display = 'none';
    document.getElementById('sMC').innerText = 'Market Cap: $0';
    document.getElementById('tMC').innerText = 'Target Market Cap: $0';
}

function swapAssets() {
    const IDs = ['Name', 'Price', 'SupplyInput', 'Unit'];

    IDs.forEach(id => {
        const sourceEl = document.getElementById('s' + id);
        const targetEl = document.getElementById('t' + id);

        const temp = sourceEl.value;
        sourceEl.value = targetEl.value;
        targetEl.value = temp;
    });

    calculate();
}

document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', calculate);
});

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
