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

function showSuccess(message) {
  const successEl = document.getElementById('successMessage');
  if (!successEl) return;
  successEl.textContent = '✅ ' + message;
  successEl.style.display = 'block';
  const errorEl = document.getElementById('errorMessage');
  if (errorEl) errorEl.style.display = 'none';
  setTimeout(() => {
    if (successEl.textContent.includes(message)) {
      successEl.style.display = 'none';
    }
  }, 4000);
}

function parseNum(val) {
  if (val === null || val === undefined) return NaN;
  const str = String(val).trim().replace(',', '.');
  return parseFloat(str);
}

function formatPrice(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0.00';
  if (num === 0) return '0.00';
  if (num < 0.01 && num > 0) {
    let str = num.toFixed(10).replace(/0+$/, '').replace(/\.$/, '');
    if (str.includes('.')) {
      const [int, dec] = str.split('.');
      return int + '.' + (dec.length > 8 ? dec.substring(0, 8) : dec);
    }
    return str;
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(num);
}

function calculateFutures() {
  var investment = parseNum(document.getElementById('investmentAmount').value);
  var entryPrice = parseNum(document.getElementById('entryPrice').value);
  var leverage = parseNum(document.getElementById('leverage').value);
  var positionType = document.getElementById('positionType').value;
  var coinName = document.getElementById('coinName').value.trim().toUpperCase();
  
  var rawMmr = document.getElementById('mmr').value;
  var mmrPercent = rawMmr === '' ? 0.4 : parseNum(rawMmr);

  if (isNaN(investment) || isNaN(entryPrice) || isNaN(leverage) || investment <= 0 || entryPrice <= 0 || leverage <= 0) {
    showError("Please enter valid positive numbers for Investment, Entry Price, and Leverage!");
    document.getElementById('warningMessage').textContent = "";
    return;
  }

  if (isNaN(mmrPercent) || mmrPercent < 0) {
    showError("Please enter a valid Maintenance Margin Rate (e.g. 0.4)!");
    return;
  }

  if (leverage > 125) {
    showError("Leverage cannot exceed 125x!");
    document.getElementById('warningMessage').textContent = "";
    return;
  }

  if (leverage > 50) {
    showSuccess("Note: Leverage is above 50x. High leverage carries extreme liquidation risk!");
  }

  var mmrRate = mmrPercent / 100;
  if (mmrRate >= (1 / leverage)) {
    showError("Maintenance Margin Rate (" + mmrPercent + "%) is too high for " + leverage + "x leverage (max: " + ((1 / leverage) * 100).toFixed(2) + "%)!");
    return;
  }

  var priceChangePercentage = Math.abs((1 / leverage - mmrRate) * 100);

  var liquidationPrice;
  if (positionType === "short") {
    liquidationPrice = entryPrice * (1 + 1 / leverage - mmrRate);
  } else {
    liquidationPrice = entryPrice * (1 - 1 / leverage + mmrRate);
  }

  if (liquidationPrice < 0) {
    liquidationPrice = 0;
  }

  var initialMargin = investment;
  var positionSize = investment * leverage;

  const assetRow = document.getElementById('resultAssetRow');
  if (coinName) {
    document.getElementById('resultCoinName').textContent = coinName;
    if (assetRow) assetRow.style.display = 'flex';
  } else {
    if (assetRow) assetRow.style.display = 'none';
  }

  document.getElementById('resultPositionSize').textContent = formatPrice(positionSize);
  document.getElementById('resultEntryPrice').textContent = formatPrice(entryPrice);
  document.getElementById('resultLeverage').textContent = leverage.toFixed(0);
  document.getElementById('resultLiquidationPrice').textContent = formatPrice(liquidationPrice);
  document.getElementById('resultInitialMargin').textContent = formatPrice(initialMargin);
  document.getElementById('resultPositionType').textContent = positionType === "short" ? "SHORT" : "LONG";

  var warningMessage = "";
  if (positionType === "short") {
    warningMessage = "You will be liquidated when price rises by " + priceChangePercentage.toFixed(2) + "% !";
  } else {
    warningMessage = "You will be liquidated when price drops by " + priceChangePercentage.toFixed(2) + "% !";
  }
  document.getElementById('warningMessage').textContent = warningMessage;

  document.getElementById('result').style.display = 'block';
  document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearForm() {
  document.getElementById('futuresForm').reset();
  document.getElementById('result').style.display = 'none';
  document.getElementById('errorMessage').style.display = 'none';
  document.getElementById('successMessage').style.display = 'none';
  const assetRow = document.getElementById('resultAssetRow');
  if (assetRow) assetRow.style.display = 'none';
  document.getElementById('investmentAmount').focus();
}

function copyLiquidationPrice() {
  const priceEl = document.getElementById('resultLiquidationPrice');
  const iconEl = document.getElementById('liqCopyIcon');
  if (!priceEl || !priceEl.textContent) return;

  navigator.clipboard.writeText(priceEl.textContent.trim()).then(() => {
    if (iconEl) {
      iconEl.className = 'fa-solid fa-check copy-icon';
      iconEl.style.color = '#2ea043';
      setTimeout(() => {
        iconEl.className = 'fa-regular fa-copy copy-icon';
        iconEl.style.color = '';
      }, 2000);
    }
  }).catch(() => {});
}

// Enter key submit listener
document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculateFutures();
    }
  });
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
