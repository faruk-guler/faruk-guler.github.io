function clearForm() {
  document.querySelectorAll('.form-group input').forEach(input => input.value = '');
  document.getElementById('result').style.display = 'none';
  document.getElementById('coin').focus();
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

function fmt(n, dec = 2) {
  if (isNaN(n)) return "0.00";
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  });
}

function showError(msg) {
  document.getElementById('result').innerHTML = `<div class="err">${msg}</div>`;
}

function calculate() {
  const buyPrice = parseFloat(document.getElementById('buyPrice').value);
  const currentPrice = parseFloat(document.getElementById('currentPrice').value);
  const buyRate = parseFloat(document.getElementById('buyRate').value);
  const currentRate = parseFloat(document.getElementById('currentRate').value);
  const amount = parseFloat(document.getElementById('amount').value);

  if ([buyPrice, currentPrice, buyRate, currentRate, amount].some(v => isNaN(v))) {
    showError("Please enter valid numeric values in all fields.");
    return;
  }
  if (buyPrice <= 0 || currentPrice <= 0 || buyRate <= 0 || currentRate <= 0 || amount <= 0) {
    showError("All values must be greater than 0.");
    return;
  }

  const investUsd = buyPrice * amount;
  const investTry = investUsd * buyRate;
  const currentUsd = currentPrice * amount;
  const currentTry = currentUsd * currentRate;
  const profitUsd = currentUsd - investUsd;
  const profitTry = currentTry - investTry;
  const roiUsd = (profitUsd / investUsd) * 100;
  const roiTry = (profitTry / investTry) * 100;
  const xUsd = currentUsd / investUsd;
  const xTry = currentTry / investTry;
  const coin = (document.getElementById("coin").value || "").toUpperCase();
  const clsUsd = profitUsd >= 0 ? "ok" : "err";
  const clsTry = profitTry >= 0 ? "ok" : "err";
  const resultDiv = document.getElementById("result");

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    ${coin ? `<div class="result-row"><span class="result-label">Asset</span><span class="result-value" id="resCoin"></span></div>` : ""}
    <div class="result-row"><span class="result-label">Investment (USD)</span><span class="result-value">$${fmt(investUsd)}</span></div>
    <div class="result-row"><span class="result-label">Investment (TRY)</span><span class="result-value">₺${fmt(investTry)}</span></div>
    <div class="result-row"><span class="result-label">Current Value (USD)</span><span class="result-value">$${fmt(currentUsd)}</span></div>
    <div class="result-row"><span class="result-label">Current Value (TRY)</span><span class="result-value">₺${fmt(currentTry)}</span></div>
    <div class="result-row">
      <span class="result-label">Profit / Loss (USD)</span>
      <span class="result-value ${clsUsd}">${profitUsd >= 0 ? '+' : ''}$${fmt(profitUsd)} (${fmt(roiUsd)}%) → ${fmt(xUsd, 3)}x</span>
    </div>
    <div class="result-row">
      <span class="result-label">Profit / Loss (TRY)</span>
      <span class="result-value ${clsTry}">${profitTry >= 0 ? '+' : ''}₺${fmt(profitTry)} (${fmt(roiTry)}%) → ${fmt(xTry, 3)}x</span>
    </div>
  `;
  if (coin) {
    document.getElementById("resCoin").textContent = coin;
  }
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
