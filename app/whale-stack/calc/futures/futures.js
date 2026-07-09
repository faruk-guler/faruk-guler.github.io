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
  }, 4000);
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
  var investment = parseFloat(document.getElementById('investmentAmount').value);
  var entryPrice = parseFloat(document.getElementById('entryPrice').value);
  var leverage = parseFloat(document.getElementById('leverage').value);
  var positionType = document.getElementById('positionType').value;
  var coinName = document.getElementById('coinName').value.trim().toUpperCase();
  var mmrPercent = parseFloat(document.getElementById('mmr').value);

  if (isNaN(investment) || isNaN(entryPrice) || isNaN(leverage) || investment <= 0 || entryPrice <= 0 || leverage <= 0) {
    showError("Please enter valid positive values!");
    document.getElementById('warningMessage').textContent = "";
    return;
  }

  if (isNaN(mmrPercent) || mmrPercent < 0) {
    showError("Please enter a valid Maintenance Margin Rate!");
    return;
  }

  if (leverage > 125) {
    showError("Leverage cannot exceed 125!");
    document.getElementById('warningMessage').textContent = "";
    return;
  }

  if (leverage > 50) {
    showSuccess("Note: Leverage is above 50x. High leverage is extremely risky! Trade with caution.");
  }

  var mmrRate = mmrPercent / 100;
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
}

function clearForm() {
  document.getElementById('futuresForm').reset();
  document.getElementById('result').style.display = 'none';
  document.getElementById('errorMessage').style.display = 'none';
  document.getElementById('successMessage').style.display = 'none';
  const assetRow = document.getElementById('resultAssetRow');
  if (assetRow) assetRow.style.display = 'none';
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculateFutures();
    }
  });
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
