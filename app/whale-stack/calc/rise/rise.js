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

function parseNum(val) {
    if (val === null || val === undefined) return NaN;
    const str = String(val).trim().replace(',', '.');
    return parseFloat(str);
}

function showError(msg) {
    const errorEl = document.getElementById('errorMessage');
    if (!errorEl) return;
    errorEl.textContent = '❌ ' + msg;
    errorEl.style.display = 'block';
    setTimeout(() => {
        if (errorEl.textContent.includes(msg)) {
            errorEl.style.display = 'none';
        }
    }, 4000);
}

function hideError() {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) errorEl.style.display = 'none';
}

function updatePreviews() {
    const sPrice = parseNum(document.getElementById('sPrice').value);
    const sInputVal = parseNum(document.getElementById('sSupplyInput').value);
    const sMultiplier = parseFloat(document.getElementById('sUnit').value) || 1;
    const sSupply = sInputVal * sMultiplier;

    if (!isNaN(sPrice) && sPrice > 0 && !isNaN(sSupply) && sSupply > 0) {
        document.getElementById('sMC').innerText = `Market Cap: ${formatUSD(sPrice * sSupply)}`;
    } else {
        document.getElementById('sMC').innerText = 'Market Cap: $0';
    }

    const tPrice = parseNum(document.getElementById('tPrice').value);
    const tInputVal = parseNum(document.getElementById('tSupplyInput').value);
    const tMultiplier = parseFloat(document.getElementById('tUnit').value) || 1;
    const tSupply = tInputVal * tMultiplier;

    if (!isNaN(tPrice) && tPrice > 0 && !isNaN(tSupply) && tSupply > 0) {
        document.getElementById('tMC').innerText = `Target Market Cap: ${formatUSD(tPrice * tSupply)}`;
    } else {
        document.getElementById('tMC').innerText = 'Target Market Cap: $0';
    }
}

function calculate(isExplicit = false) {
    updatePreviews();

    const sName = document.getElementById('sName').value.trim() || 'Asset';
    const tName = document.getElementById('tName').value.trim() || 'Competitor';

    const sPrice = parseNum(document.getElementById('sPrice').value);
    const sInputVal = parseNum(document.getElementById('sSupplyInput').value);
    const sMultiplier = parseFloat(document.getElementById('sUnit').value) || 1;
    const sSupply = sInputVal * sMultiplier;

    const tPrice = parseNum(document.getElementById('tPrice').value);
    const tInputVal = parseNum(document.getElementById('tSupplyInput').value);
    const tMultiplier = parseFloat(document.getElementById('tUnit').value) || 1;
    const tSupply = tInputVal * tMultiplier;

    const isValid = !isNaN(sPrice) && sPrice > 0 &&
                    !isNaN(sSupply) && sSupply > 0 &&
                    !isNaN(tPrice) && tPrice > 0 &&
                    !isNaN(tSupply) && tSupply > 0;

    if (!isValid) {
        document.getElementById('resultArea').style.display = 'none';
        if (isExplicit) {
            showError('Please enter valid positive Price and Circulating Supply for both assets.');
        }
        return;
    }

    hideError();

    const sMC = sPrice * sSupply;
    const tMC = tPrice * tSupply;

    const targetPrice = tMC / sSupply;
    const multiplier = targetPrice / sPrice;
    const percent = (multiplier - 1) * 100;

    const resultArea = document.getElementById('resultArea');
    resultArea.style.display = 'block';
    if (isExplicit) {
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    document.getElementById('resName').innerText = sName;
    document.getElementById('resTargetName').innerText = tName;
    document.getElementById('resPrice').innerText = formatPrice(targetPrice);
    document.getElementById('resPrice').setAttribute('data-raw', targetPrice);
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
    hideError();
    document.getElementById('sName').focus();
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

    calculate(false);
}

function copyResultPrice() {
    const priceEl = document.getElementById('resPrice');
    const hintEl = document.getElementById('copyHint');
    if (!priceEl || !priceEl.innerText || priceEl.innerText.includes('---')) return;

    const raw = priceEl.getAttribute('data-raw');
    const textToCopy = raw || priceEl.innerText.replace('$', '').trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
        if (hintEl) {
            const originalText = hintEl.innerHTML;
            hintEl.innerHTML = '<i class="fa-solid fa-check"></i> Copied to clipboard!';
            hintEl.style.color = 'var(--success)';
            setTimeout(() => {
                hintEl.innerHTML = originalText;
                hintEl.style.color = '';
            }, 2000);
        }
    }).catch(() => {});
}

// Live input & change listeners
document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => calculate(false));
    el.addEventListener('change', () => calculate(false));
});

// ESC key to return to main WhaleStack app
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.parent.postMessage({ type: 'CLOSE_TOOL' }, '*');
    }
});

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
