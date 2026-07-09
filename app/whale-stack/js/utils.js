
// Format raw price for display
function formatRawPrice(num) {
    if (num === 0) return '0.00';
    if (num < 0.01) {
        return num.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
    }
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}

// Format current date
function getCurrentDateFormatted() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


// Utility Function for Download
function triggerDownload(dataUri, filename) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.style.display = 'none';
    document.body.appendChild(linkElement); // Required for Firefox
    linkElement.click();
    document.body.removeChild(linkElement);
}

// XSS Prevention Utility
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    const p = document.createElement('p');
    p.textContent = String(str);
    return p.innerHTML;
}

// Format Price dynamically to support very small altcoin prices in USD
function formatPrice(num, signDisplay = 'auto') {
    const symbol = '$';
    const locale = 'en-US';
    const currency = 'USD';
    const value = num;

    if (typeof value !== 'number' || isNaN(value)) return symbol + '0.00';
    if (value === 0) return symbol + '0.00';

    // For very small prices (micro-cap altcoins) keep high precision
    if (Math.abs(value) < 0.01 && value !== 0) {
        const sign = value < 0 ? '-' : (signDisplay === 'always' ? '+' : '');
        let str = Math.abs(value).toFixed(10).replace(/0+$/, '').replace(/\.$/, '');
        if (str.includes('.')) {
            const [int, dec] = str.split('.');
            return sign + symbol + int + '.' + (dec.length > 8 ? dec.substring(0, 8) : dec);
        }
        return sign + symbol + str;
    }

    // For values >= 0.01: use 2 decimal digits (clean display)
    // Exception: values between 0.01 and 1 (e.g. small coins) use up to 6 decimals
    const maxFraction = Math.abs(value) >= 1 ? 2 : 6;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: maxFraction,
        signDisplay: signDisplay
    }).format(value);
}


// Show Confirm Toast (custom confirm dialog instead of native browser confirm)
let confirmCallback = null;
function showConfirm(message, onConfirm) {
    confirmCallback = onConfirm;
    const existing = document.getElementById('confirmToast');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.id = 'confirmToast';
    div.style.cssText = `
        position: fixed; bottom: 6rem; right: 2rem;
        background: var(--panel-bg); backdrop-filter: blur(10px);
        border: 1px solid rgba(210, 153, 34, 0.5);
        padding: 1rem 1.5rem; border-radius: 8px;
        display: flex; align-items: center; gap: 1rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 1100; animation: slideInRight 0.3s ease;
        max-width: 380px; font-size: 0.9rem;
    `;
    div.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation" style="color:#d29922;font-size:1.1rem;"></i>
        <span style="flex:1;color:var(--text-primary)">${message}</span>
        <button onclick="document.getElementById('confirmToast').remove(); if(confirmCallback){confirmCallback(); confirmCallback=null;}" 
            style="background:#f85149;color:#fff;border:none;padding:0.35rem 0.8rem;border-radius:6px;cursor:pointer;font-size:0.82rem;font-weight:700;">Yes</button>
        <button onclick="document.getElementById('confirmToast').remove(); confirmCallback=null;"
            style="background:transparent;border:1px solid var(--border-color);color:var(--text-primary);padding:0.35rem 0.8rem;border-radius:6px;cursor:pointer;font-size:0.82rem;">No</button>
    `;
    document.body.appendChild(div);
    setTimeout(() => { const el = document.getElementById('confirmToast'); if(el) el.remove(); confirmCallback=null; }, 8000);
}

// Show Toast Notification
let toastTimeout;
function showToast(message, isError = false) {
    toastMessage.textContent = message;

    if (isError) {
        toast.classList.add('error');
        toastIcon.className = 'fa-solid fa-circle-exclamation';
    } else {
        toast.classList.remove('error');
        toastIcon.className = 'fa-solid fa-check-circle';
    }

    toast.classList.remove('hidden');
    toast.style.opacity = '1';

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
}

