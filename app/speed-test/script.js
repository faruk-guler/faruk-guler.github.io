// Note: Direct file endpoints like Hetzner / Linode / DigitalOcean don't send
// CORS headers (Access-Control-Allow-Origin), so fetch() from a browser always
// fails against them. Cloudflare's public speed-test infrastructure
// (speed.cloudflare.com) is fully CORS-enabled and is the same backend used by
// the official speed.cloudflare.com site, so it's used here instead.
const CF_BASE = "https://speed.cloudflare.com";
const history = [];
let testRunning = false;

function setButtonsDisabled(disabled) {
  ["startTest", "downloadTest", "uploadTest", "pingTest"].forEach(id => {
    document.getElementById(id).disabled = disabled;
  });
}

function showError(msg) {
  const el = document.getElementById("errorMessage");
  const ok = document.getElementById("successMessage");
  ok.style.display = "none";
  el.textContent = msg;
  el.style.display = "block";
}

function showSuccess(msg) {
  const el = document.getElementById("errorMessage");
  const ok = document.getElementById("successMessage");
  el.style.display = "none";
  ok.textContent = msg;
  ok.style.display = "block";
}

function clearMessages() {
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("successMessage").style.display = "none";
}

function getTestSizeBytes() {
  const mb = parseInt(document.getElementById("sizeSelect").value, 10) || 25;
  return mb * 1024 * 1024;
}

async function measureDownload() {
  const bytes = getTestSizeBytes();
  const url = `${CF_BASE}/__down?bytes=${bytes}&cb=${Date.now()}`;
  const progressBar = document.getElementById("downloadProgress");
  const speedEl = document.getElementById("downloadSpeed");
  progressBar.style.width = "0%";
  speedEl.textContent = "-";

  const start = performance.now();
  let received = 0;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    if (!response.body) {
      // Fallback for older browsers without ReadableStream support
      await response.blob();
      const seconds = (performance.now() - start) / 1000;
      const mbps = (bytes * 8) / seconds / 1_000_000;
      speedEl.textContent = mbps.toFixed(2);
      progressBar.style.width = "100%";
      return mbps;
    }

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.length;
      const elapsed = (performance.now() - start) / 1000;
      if (elapsed > 0.05) {
        speedEl.textContent = ((received * 8) / elapsed / 1_000_000).toFixed(2);
      }
      progressBar.style.width = Math.min(100, (received / bytes) * 100).toFixed(0) + "%";
    }

    const totalSeconds = (performance.now() - start) / 1000;
    const finalMbps = (received * 8) / totalSeconds / 1_000_000;
    speedEl.textContent = finalMbps.toFixed(2);
    progressBar.style.width = "100%";
    return finalMbps;
  } catch (e) {
    showError("Download test failed: " + e.message);
    speedEl.textContent = "-";
    return null;
  }
}

function measureUpload() {
  const sizeBytes = Math.min(getTestSizeBytes(), 25 * 1024 * 1024); // cap upload at 25MB so slow connections don't take too long
  const data = new Uint8Array(sizeBytes);
  const blob = new Blob([data]);
  const progressBar = document.getElementById("uploadProgress");
  const speedEl = document.getElementById("uploadSpeed");
  progressBar.style.width = "0%";
  speedEl.textContent = "-";

  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    const start = performance.now();

    xhr.open("POST", `${CF_BASE}/__up`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const elapsed = (performance.now() - start) / 1000;
        if (elapsed > 0.05) {
          speedEl.textContent = ((e.loaded * 8) / elapsed / 1_000_000).toFixed(2);
        }
        progressBar.style.width = ((e.loaded / e.total) * 100).toFixed(0) + "%";
      }
    };

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        showError(`Upload test failed: HTTP ${xhr.status}`);
        speedEl.textContent = "-";
        resolve(null);
        return;
      }
      const totalSeconds = (performance.now() - start) / 1000;
      const finalMbps = (sizeBytes * 8) / totalSeconds / 1_000_000;
      speedEl.textContent = finalMbps.toFixed(2);
      progressBar.style.width = "100%";
      resolve(finalMbps);
    };

    xhr.onerror = () => {
      showError("Upload test failed (connection error).");
      speedEl.textContent = "-";
      resolve(null);
    };

    xhr.send(blob);
  });
}

async function measurePing() {
  const trials = 6;
  const times = [];

  try {
    // Warm-up request: keeps DNS/TLS setup time out of the actual measurement
    await fetch(`${CF_BASE}/__down?bytes=0&w=${Math.random()}`);
  } catch (e) {
    showError("Ping test failed: " + e.message);
    document.getElementById("pingResult").textContent = "-";
    document.getElementById("jitterResult").textContent = "-";
    return null;
  }

  try {
    for (let i = 0; i < trials; i++) {
      const start = performance.now();
      await fetch(`${CF_BASE}/__down?bytes=0&w=${Math.random()}_${i}`);
      times.push(performance.now() - start);
    }
  } catch (e) {
    showError("Ping test failed: " + e.message);
    document.getElementById("pingResult").textContent = "-";
    document.getElementById("jitterResult").textContent = "-";
    return null;
  }

  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const jitter = times.reduce((a, t) => a + Math.abs(t - avg), 0) / times.length;
  document.getElementById("pingResult").textContent = `Ping: ${avg.toFixed(1)} ms`;
  document.getElementById("jitterResult").textContent = `Jitter: ${jitter.toFixed(1)} ms`;
  return { avg, jitter };
}

function addHistoryEntry(entry) {
  history.unshift(entry);
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  if (history.length === 0) {
    list.innerHTML = '<span class="history-empty">No tests run yet.</span>';
    return;
  }
  list.innerHTML = "";
  history.forEach(h => {
    const row = document.createElement("div");
    row.className = "history-item";
    row.innerHTML =
      `<span>${h.time}</span>` +
      `<span>&#8595; ${h.download ?? "-"} Mbps</span>` +
      `<span>&#8593; ${h.upload ?? "-"} Mbps</span>` +
      `<span>Ping ${h.ping ?? "-"} ms</span>`;
    list.appendChild(row);
  });
}

document.getElementById("startTest").onclick = async () => {
  if (testRunning) return;
  testRunning = true;
  setButtonsDisabled(true);
  clearMessages();

  const download = await measureDownload();
  const upload = await measureUpload();
  const ping = await measurePing();

  addHistoryEntry({
    time: new Date().toLocaleTimeString('en-US'),
    download: download ? download.toFixed(2) : null,
    upload: upload ? upload.toFixed(2) : null,
    ping: ping ? ping.avg.toFixed(1) : null
  });

  if (download && upload && ping) {
    showSuccess("Full test completed.");
  }

  setButtonsDisabled(false);
  testRunning = false;
};

document.getElementById("downloadTest").onclick = async () => {
  if (testRunning) return;
  testRunning = true;
  setButtonsDisabled(true);
  clearMessages();
  const download = await measureDownload();
  if (download) {
    showSuccess("Download test completed.");
    addHistoryEntry({ time: new Date().toLocaleTimeString('en-US'), download: download.toFixed(2), upload: null, ping: null });
  }
  setButtonsDisabled(false);
  testRunning = false;
};

document.getElementById("uploadTest").onclick = async () => {
  if (testRunning) return;
  testRunning = true;
  setButtonsDisabled(true);
  clearMessages();
  const upload = await measureUpload();
  if (upload) {
    showSuccess("Upload test completed.");
    addHistoryEntry({ time: new Date().toLocaleTimeString('en-US'), download: null, upload: upload.toFixed(2), ping: null });
  }
  setButtonsDisabled(false);
  testRunning = false;
};

document.getElementById("pingTest").onclick = async () => {
  if (testRunning) return;
  testRunning = true;
  setButtonsDisabled(true);
  clearMessages();
  const ping = await measurePing();
  if (ping) {
    showSuccess("Ping and jitter test completed.");
    addHistoryEntry({ time: new Date().toLocaleTimeString('en-US'), download: null, upload: null, ping: ping.avg.toFixed(1) });
  }
  setButtonsDisabled(false);
  testRunning = false;
};

document.getElementById("clearHistory").onclick = () => {
  history.length = 0;
  renderHistory();
};
