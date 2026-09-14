function parseNum(val) {
  if (val === null || val === undefined) return NaN;
  const str = String(val).trim().replace(',', '.');
  return parseFloat(str);
}

function showError(msg) {
  const errBox = document.getElementById('errorBox');
  if (!errBox) return;
  errBox.textContent = '❌ ' + msg;
  errBox.style.display = 'block';
  setTimeout(() => {
    if (errBox.textContent.includes(msg)) {
      errBox.style.display = 'none';
    }
  }, 4500);
}

function showInfo(msg) {
  const infoBox = document.getElementById('infoBox');
  if (!infoBox) return;
  infoBox.textContent = 'ℹ️ ' + msg;
  infoBox.style.display = 'block';
  setTimeout(() => {
    if (infoBox.textContent.includes(msg)) {
      infoBox.style.display = 'none';
    }
  }, 4500);
}

function clearMessages() {
  const errBox = document.getElementById('errorBox');
  const infoBox = document.getElementById('infoBox');
  if (errBox) errBox.style.display = 'none';
  if (infoBox) infoBox.style.display = 'none';
}

function fmt(n, dec = 2) {
  if (isNaN(n)) return "0.00";
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.copyResultText = function (text, iconId) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const icon = document.getElementById(iconId);
    if (icon) {
      icon.className = 'fa-solid fa-check copy-icon';
      icon.style.color = '#2ea043';
      setTimeout(() => {
        icon.className = 'fa-regular fa-copy copy-icon';
        icon.style.color = '';
      }, 2000);
    }
  }).catch(() => {});
};

function calculate() {
  clearMessages();

  const buyPrice = parseNum(document.getElementById('buyPrice').value);
  const currentPrice = parseNum(document.getElementById('currentPrice').value);
  const amount = parseNum(document.getElementById('amount').value);

  const buyRate = parseNum(document.getElementById('buyRate').value);
  const currentRate = parseNum(document.getElementById('currentRate').value);

  if (isNaN(buyPrice) || isNaN(currentPrice) || isNaN(amount)) {
    showError("Please enter valid numeric values for Buy Price, Current Price, and Amount.");
    return;
  }

  if (buyPrice <= 0 || currentPrice <= 0 || amount <= 0) {
    showError("Buy Price, Current Price, and Amount must be greater than 0.");
    return;
  }

  const investUsd = buyPrice * amount;
  const currentUsd = currentPrice * amount;
  const profitUsd = currentUsd - investUsd;
  const roiUsd = (profitUsd / investUsd) * 100;
  const xUsd = currentUsd / investUsd;
  const clsUsd = profitUsd >= 0 ? "ok" : "err";
  const rawCoin = (document.getElementById("coin").value || "").trim().toUpperCase();
  const safeCoin = escapeHtml(rawCoin);

  const formattedProfitUsd = profitUsd >= 0 ? `+$${fmt(profitUsd)}` : `-$${fmt(Math.abs(profitUsd))}`;
  const formattedRoiUsd = roiUsd >= 0 ? `+${fmt(roiUsd)}%` : `${fmt(roiUsd)}%`;

  const hasBuyRate = !isNaN(buyRate) && buyRate > 0;
  const hasCurrentRate = !isNaN(currentRate) && currentRate > 0;
  const hasTryRates = hasBuyRate && hasCurrentRate;

  if ((hasBuyRate && !hasCurrentRate) || (!hasBuyRate && hasCurrentRate)) {
    showInfo("Note: To calculate TRY values, please enter both Buy Rate and Current Rate.");
  }

  let tryHtml = "";
  if (hasTryRates) {
    const investTry = investUsd * buyRate;
    const currentTry = currentUsd * currentRate;
    const profitTry = currentTry - investTry;
    const roiTry = (profitTry / investTry) * 100;
    const xTry = currentTry / investTry;
    const clsTry = profitTry >= 0 ? "ok" : "err";
    const formattedProfitTry = profitTry >= 0 ? `+₺${fmt(profitTry)}` : `-₺${fmt(Math.abs(profitTry))}`;
    const formattedRoiTry = roiTry >= 0 ? `+${fmt(roiTry)}%` : `${fmt(roiTry)}%`;

    tryHtml = `
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
        <span class="section-badge" style="background: #eab308; color: #111;">TRY Analysis</span>
        <div class="result-row"><span class="result-label">Initial Investment (TRY)</span><span class="result-value">₺${fmt(investTry)}</span></div>
        <div class="result-row"><span class="result-label">Current Value (TRY)</span><span class="result-value">₺${fmt(currentTry)}</span></div>
        <div class="result-row">
          <span class="result-label">Net Profit / Loss (TRY)</span>
          <span class="result-value ${clsTry} clickable-copy" onclick="copyResultText('${formattedProfitTry}', 'copyTryIcon')" title="Click to copy Profit/Loss">
            ${formattedProfitTry} (${formattedRoiTry}) → ${fmt(xTry, 3)}x
            <i class="fa-regular fa-copy copy-icon" id="copyTryIcon"></i>
          </span>
        </div>
      </div>
    `;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    ${safeCoin ? `<div class="result-row"><span class="result-label">Asset</span><span class="result-value">${safeCoin}</span></div>` : ""}
    <div class="result-row"><span class="result-label">Purchased Quantity</span><span class="result-value">${fmt(amount, 4)} ${safeCoin || 'units'}</span></div>
    <div class="result-row"><span class="result-label">Initial Investment (USD)</span><span class="result-value">$${fmt(investUsd)}</span></div>
    <div class="result-row"><span class="result-label">Current Value (USD)</span><span class="result-value">$${fmt(currentUsd)}</span></div>
    <div class="result-row">
      <span class="result-label">Net Profit / Loss (USD)</span>
      <span class="result-value ${clsUsd} clickable-copy" onclick="copyResultText('${formattedProfitUsd}', 'copyUsdIcon')" title="Click to copy Profit/Loss">
        ${formattedProfitUsd} (${formattedRoiUsd}) → ${fmt(xUsd, 3)}x
        <i class="fa-regular fa-copy copy-icon" id="copyUsdIcon"></i>
      </span>
    </div>
    ${tryHtml}
  `;

  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearForm() {
  document.querySelectorAll('.form-group input').forEach(input => input.value = '');
  document.getElementById('result').style.display = 'none';
  clearMessages();
  document.getElementById('coin').focus();
}

const calcBtn = document.getElementById("calcBtn");
if (calcBtn) calcBtn.addEventListener("click", calculate);

const clearBtn = document.getElementById("clearBtn");
if (clearBtn) clearBtn.addEventListener("click", clearForm);

// Live auto-calculate: only runs silently when all 3 required fields are valid
function tryAutoCalculate() {
    const buyPrice     = parseNum(document.getElementById('buyPrice').value);
    const currentPrice = parseNum(document.getElementById('currentPrice').value);
    const amount       = parseNum(document.getElementById('amount').value);
    // Only auto-calc if all required fields are filled with valid positive values
    if (!isNaN(buyPrice) && buyPrice > 0 &&
        !isNaN(currentPrice) && currentPrice > 0 &&
        !isNaN(amount) && amount > 0) {
        calculate();
    } else {
        // Hide result but don't show errors while user is still filling in fields
        const resultDiv = document.getElementById('result');
        if (resultDiv) resultDiv.style.display = 'none';
        clearMessages();
    }
}

document.querySelectorAll('input').forEach(function(input) {
    input.addEventListener('input', tryAutoCalculate);
    input.addEventListener('change', tryAutoCalculate);
});

// Prevent accidental wheel scroll value increments
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('wheel', (e) => e.target.blur(), { passive: true });
});

// ESC key to return to main WhaleStack app
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.parent.postMessage({ type: 'CLOSE_TOOL' }, '*');
  }
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
