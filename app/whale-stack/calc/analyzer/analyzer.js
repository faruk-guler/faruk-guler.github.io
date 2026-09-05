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
  const coin = (document.getElementById("coin").value || "").trim().toUpperCase();

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

    tryHtml = `
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
        <span class="section-badge" style="background: #eab308; color: #111;">TRY Analysis</span>
        <div class="result-row"><span class="result-label">Initial Investment (TRY)</span><span class="result-value">₺${fmt(investTry)}</span></div>
        <div class="result-row"><span class="result-label">Current Value (TRY)</span><span class="result-value">₺${fmt(currentTry)}</span></div>
        <div class="result-row">
          <span class="result-label">Net Profit / Loss (TRY)</span>
          <span class="result-value ${clsTry}">${profitTry >= 0 ? '+' : ''}₺${fmt(profitTry)} (${fmt(roiTry)}%) → ${fmt(xTry, 3)}x</span>
        </div>
      </div>
    `;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    ${coin ? `<div class="result-row"><span class="result-label">Asset</span><span class="result-value" id="resCoin"></span></div>` : ""}
    <div class="result-row"><span class="result-label">Purchased Quantity</span><span class="result-value">${fmt(amount, 4)} ${coin || 'units'}</span></div>
    <div class="result-row"><span class="result-label">Initial Investment (USD)</span><span class="result-value">$${fmt(investUsd)}</span></div>
    <div class="result-row"><span class="result-label">Current Value (USD)</span><span class="result-value">$${fmt(currentUsd)}</span></div>
    <div class="result-row">
      <span class="result-label">Net Profit / Loss (USD)</span>
      <span class="result-value ${clsUsd}">${profitUsd >= 0 ? '+' : ''}$${fmt(profitUsd)} (${fmt(roiUsd)}%) → ${fmt(xUsd, 3)}x</span>
    </div>
    ${tryHtml}
  `;

  if (coin) {
    document.getElementById("resCoin").textContent = coin;
  }

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

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculate();
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
