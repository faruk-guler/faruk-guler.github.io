'use strict';

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function parseIP(s) {
  const p = s.trim().split('.').map(Number);
  return p.length === 4 && !p.some(x => isNaN(x) || x < 0 || x > 255) ? p : null;
}
function ip2n(p) { return (p[0] << 24 | p[1] << 16 | p[2] << 8 | p[3]) >>> 0; }
function n2ip(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
function mask2dec(pfx) { return n2ip(pfx === 0 ? 0 : (0xFFFFFFFF << (32 - pfx)) >>> 0); }
function getClass(o) {
  if (o === 0)           return '0'; /* 0.0.0.0 — unspecified */
  if (o < 127)           return 'A';
  if (o === 127)         return 'L'; /* 127.x.x.x — Loopback */
  if (o < 192)           return 'B';
  if (o < 224)           return 'C';
  if (o < 240)           return 'D';
  return 'E';
}
function isPrivate(p) {
  return p[0] === 0   ||
    p[0] === 10  ||
    (p[0] === 172 && p[1] >= 16 && p[1] <= 31) ||
    (p[0] === 192 && p[1] === 168) ||
    p[0] === 127;
}
function parseCIDR(s) {
  const m = s.trim().match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/);
  if (!m) return null;
  const p = parseIP(m[1]);
  const pfx = parseInt(m[2]);
  if (!p || pfx < 0 || pfx > 32) return null;
  const mask = pfx === 0 ? 0 : (0xFFFFFFFF << (32 - pfx)) >>> 0;
  const net  = (ip2n(p) & mask) >>> 0;
  return { net, pfx, mask };
}
function makeBits(row, bits, cls) {
  row.innerHTML = '';
  bits.forEach(b => {
    const d = document.createElement('div');
    d.className = 'ab ' + (cls ? cls(b) : '');
    d.textContent = b;
    row.appendChild(d);
  });
}
function makeOdots(el) {
  el.innerHTML = '';
  for (let i = 0; i < 32; i++) {
    const d = document.createElement('div');
    d.className = 'odot';
    // Oktet sınırı nokta işareti
    d.textContent = (i === 7 || i === 15 || i === 23) ? '·' : '';
    el.appendChild(d);
  }
}


/* Info kartı */
function ic(lbl, val) {
  return `<div class="ic"><div class="lbl">${lbl}</div><div class="val">${val}</div></div>`;
}

/* ══════════════════════════════════════════════
   DURUM (STATE)
══════════════════════════════════════════════ */
let sharedIP    = '192.168.10.50';
let activePanel = 'bit';

/* Undo stack — her tip için ayrı geçmiş */
const historyStack = { depts: [], snets: [] };

/* ══════════════════════════════════════════════
   DOM REFERANSLARI
══════════════════════════════════════════════ */
const slider    = document.getElementById('cidr-slider');
const display   = document.getElementById('cidr-display');
const ipInput   = document.getElementById('ip-input');
const ipInputA  = document.getElementById('ip-input-and');
const divSlider = document.getElementById('div-slider');

/* ══════════════════════════════════════════════
   UNDO
══════════════════════════════════════════════ */
function pushHistory(type) {
  if (type === 'depts') {
    historyStack.depts.push(JSON.stringify(depts));
    if (historyStack.depts.length > 20) historyStack.depts.shift();
  } else if (type === 'snets') {
    historyStack.snets.push(JSON.stringify(snets));
    if (historyStack.snets.length > 20) historyStack.snets.shift();
  }
  updateUndoBtns();
}
function undoAction(type) {
  if (type === 'depts' && historyStack.depts.length > 0) {
    depts = JSON.parse(historyStack.depts.pop());
    renderDeptList(); renderVLSM();
  } else if (type === 'snets' && historyStack.snets.length > 0) {
    snets = JSON.parse(historyStack.snets.pop());
    renderSNList(); renderSupernet();
  }
  updateUndoBtns();
}
function updateUndoBtns() {
  const vBtn = document.getElementById('btn-undo-vlsm');
  const sBtn = document.getElementById('btn-undo-sn');
  if (vBtn) vBtn.disabled = historyStack.depts.length === 0;
  if (sBtn) sBtn.disabled = historyStack.snets.length === 0;
}

/* ══════════════════════════════════════════════
   NAV
══════════════════════════════════════════════ */
function switchPanel(panelId) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const btn     = document.querySelector(`.nav-btn[data-panel="${panelId}"]`);
  const panelEl = document.getElementById(`panel-${panelId}`);
  if (btn)     btn.classList.add('active');
  if (panelEl) panelEl.classList.add('active');
  activePanel = panelId;
}
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchPanel(btn.dataset.panel));
});

/* ══════════════════════════════════════════════
   INPUT DOĞRULAMA (GÖRSEL)
══════════════════════════════════════════════ */
function setInputValid(el, valid) {
  if (valid) {
    el.classList.remove('invalid', 'shake');
  } else if (!el.classList.contains('invalid')) {
    el.classList.add('invalid');
    void el.offsetWidth; // reflow — animasyonu sıfırla
    el.classList.add('shake');
  }
}

/* ══════════════════════════════════════════════
   ANA RENDER
══════════════════════════════════════════════ */
function render() {
  const pfx  = parseInt(slider.value);
  display.textContent = '/' + pfx;
  document.getElementById('div-cur').textContent = pfx;
  const mask = pfx === 0 ? 0 : (0xFFFFFFFF << (32 - pfx)) >>> 0;

  /* Bit ızgarası */
  const bg = document.getElementById('bit-grid');
  const od = document.getElementById('oct-dots');
  bg.innerHTML = ''; makeOdots(od);
  for (let i = 0; i < 32; i++) {
    const c = document.createElement('div');
    c.className  = 'bit-cell ' + (i < pfx ? 'bit-net' : 'bit-host');
    c.textContent = i < pfx ? '1' : '0';
    bg.appendChild(c);
  }

  /* Paylaşılan IP her iki input'a yansıtılır — döngü riski yok */
  ipInput.value  = sharedIP;
  ipInputA.value = sharedIP;

  const ipParts = parseIP(sharedIP);
  setInputValid(ipInput,  !!ipParts);
  setInputValid(ipInputA, !!ipParts);

  renderIPPanel(ipParts, pfx, mask);
  renderAND(ipParts, pfx, mask);
  renderMap(pfx, ipParts, mask);
  renderDivider(pfx);
}

/* ── IP Analizi Paneli ── */
function renderIPPanel(ipParts, pfx, mask) {
  const ipBG    = document.getElementById('ip-bit-grid');
  const ipBin   = document.getElementById('ip-binary');
  const ipOD    = document.getElementById('ip-oct-dots');
  const infoRow = document.getElementById('info-row');
  ipBG.innerHTML = ''; ipBin.innerHTML = ''; makeOdots(ipOD);

  if (!ipParts) {
    infoRow.innerHTML = `<div class="ic"><div class="lbl" style="color:var(--color-text-danger)">Geçersiz IP adresi</div></div>`;
    return;
  }

  const ipNum = ip2n(ipParts), bits = [];
  for (let i = 31; i >= 0; i--) bits.unshift((ipNum >> i) & 1);
  for (let i = 0; i < 32; i++) {
    const bc = document.createElement('div'); bc.className = 'bin-cell'; bc.textContent = bits[i]; ipBin.appendChild(bc);
    const c  = document.createElement('div'); c.className = 'bit-cell ' + (i < pfx ? 'bit-net' : 'bit-host'); c.textContent = bits[i]; ipBG.appendChild(c);
  }

  const net    = (ipNum & mask) >>> 0;
  const bc2    = (net | (~mask >>> 0)) >>> 0;
  const total  = Math.pow(2, 32 - pfx);
  const usable = pfx === 32 ? 1 : pfx === 31 ? 2 : total - 2;
  // RFC 3021: /31'de network/broadcast kavramı yoktur — her iki adres de kullanılabilir
  const first  = pfx === 32 ? n2ip(net) : pfx === 31 ? n2ip(net)    : n2ip(net + 1);
  const last   = pfx === 32 ? n2ip(net) : pfx === 31 ? n2ip(bc2)    : n2ip(bc2 - 1);
  const wc     = n2ip(~mask >>> 0);
  const cls    = getClass(ipParts[0]);
  const priv   = isPrivate(ipParts);

  infoRow.innerHTML =
    ic('Subnet maskesi',       mask2dec(pfx)) +
    ic('Wildcard maskesi',     wc) +
    ic('Ağ adresi',            pfx === 31 ? '— (RFC 3021)' : n2ip(net)) +
    ic('Broadcast',            pfx === 31 ? '— (RFC 3021)' : n2ip(bc2)) +
    ic('İlk kullanılabilir',   first) +
    ic('Son kullanılabilir',   last) +
    ic('Toplam IP',            total.toLocaleString('tr-TR')) +
    ic('Kullanılabilir host',  usable.toLocaleString('tr-TR')) +
    ic('IP sınıfı',  `<span class="badge b-${cls}">${
      cls === 'L' ? 'Loopback' :
      cls === '0' ? 'Unspecified' :
      'Class ' + cls
    }</span>`) +
    ic('Tür',        `<span class="badge ${priv ? 'b-priv' : 'b-pub'}">${priv ? 'Private' : 'Public'}</span>`);
}

/* ── Binary AND Paneli ── */
function renderAND(ipParts, pfx, mask) {
  const aiEl   = document.getElementById('and-ip');
  const amEl   = document.getElementById('and-mask');
  const arEl   = document.getElementById('and-result');
  const aiInfo = document.getElementById('and-info');

  if (!ipParts) { aiEl.innerHTML = ''; amEl.innerHTML = ''; arEl.innerHTML = ''; aiInfo.innerHTML = ''; return; }

  const ipNum = ip2n(ipParts), ipBits = [], maskBits = [];
  for (let i = 31; i >= 0; i--) { ipBits.unshift((ipNum >> i) & 1); maskBits.unshift((mask >> i) & 1); }
  const res = ipBits.map((b, i) => b & maskBits[i]);

  makeBits(aiEl, ipBits,   b => b ? 'n1' : 'n0');
  makeBits(amEl, maskBits, b => b ? 'n1' : 'n0');
  makeBits(arEl, res,      b => b ? 'r1' : 'r0');

  const net = (ipNum & mask) >>> 0;
  aiInfo.innerHTML =
    ic('IP adresi',     n2ip(ipNum)) +
    ic('Subnet maskesi', mask2dec(pfx)) +
    ic('= Ağ adresi',   n2ip(net));
}

/* ── Subnet Haritası Paneli ── */
function renderMap(pfx, ipParts, mask) {
  const pct = (pfx / 32) * 100;
  const mn  = document.getElementById('map-net');
  const mh  = document.getElementById('map-host');
  mn.style.width = pct + '%';
  mn.textContent = pct >= 12 ? pfx + ' bit' : '';
  mh.textContent = (100 - pct) >= 8 ? (32 - pfx) + ' bit' : '';
  document.getElementById('map-nb').textContent = pfx;
  document.getElementById('map-hb').textContent = 32 - pfx;

  const mapInfo = document.getElementById('map-info');
  if (ipParts) {
    const ipNum  = ip2n(ipParts);
    const net    = (ipNum & mask) >>> 0;
    const bc     = (net | (~mask >>> 0)) >>> 0;
    const total  = Math.pow(2, 32 - pfx);
    const usable = pfx === 32 ? 1 : pfx === 31 ? 2 : total - 2;
    mapInfo.innerHTML =
      ic('Ağ adresi',           pfx === 31 ? n2ip(net) + ' (p2p)' : n2ip(net)) +
      ic('Broadcast',           pfx === 31 ? n2ip(bc)  + ' (p2p)' : n2ip(bc)) +
      ic('Toplam IP',           total.toLocaleString('tr-TR')) +
      ic('Kullanılabilir host', usable.toLocaleString('tr-TR'));
  } else {
    mapInfo.innerHTML = '';
  }
}

/* ── Subnet Bölücü Paneli ── */
function renderDivider(pfx) {
  /* /32 için bölme mümkün değil */
  if (pfx === 32) {
    divSlider.disabled = true;
    document.getElementById('div-lbl').textContent = '—';
    document.getElementById('div-warn').textContent = '/32 subnet bölünemez.';
    document.getElementById('div-cards').innerHTML  = '';
    return;
  }
  divSlider.disabled = false;

  /* Slider minimum'unu dinamik olarak ayarla */
  const minTarget = pfx + 1;
  divSlider.min   = minTarget;
  if (parseInt(divSlider.value) <= pfx) divSlider.value = Math.min(minTarget, 32);

  const target = parseInt(divSlider.value);
  document.getElementById('div-lbl').textContent = target;
  const warn  = document.getElementById('div-warn');
  const cards = document.getElementById('div-cards');

  if (target <= pfx) { warn.textContent = 'Hedef prefix mevcut prefixten büyük olmalı.'; cards.innerHTML = ''; return; }
  warn.textContent = '';

  const sc  = Math.pow(2, target - pfx);
  const hps = target === 32 ? 1 : target === 31 ? 2 : Math.pow(2, 32 - target) - 2;
  cards.innerHTML =
    `<div class="dc"><div class="lbl">Oluşan subnet</div><div class="val">${sc.toLocaleString('tr-TR')}</div></div>` +
    `<div class="dc"><div class="lbl">Subnet başına host</div><div class="val">${hps.toLocaleString('tr-TR')}</div></div>` +
    `<div class="dc"><div class="lbl">Toplam kullanılabilir</div><div class="val">${(sc * hps).toLocaleString('tr-TR')}</div></div>` +
    `<div class="dc"><div class="lbl">Ödünç bit</div><div class="val">${target - pfx} bit</div></div>`;
}

/* ══════════════════════════════════════════════
   VLSM PLANLAYICI
══════════════════════════════════════════════ */
const VLSM_COLORS = ['#7F77DD','#1D9E75','#BA7517','#D85A30','#185FA5','#3B6D11','#993556','#5F5E5A'];
let depts = [
  { name: 'Yönetim',  hosts: 50 },
  { name: 'Muhasebe', hosts: 25 },
  { name: 'IT',       hosts: 10 },
  { name: 'Misafir',  hosts:  5 },
];

function renderDeptList() {
  const list = document.getElementById('dept-list');
  list.innerHTML = '';
  depts.forEach((d, i) => {
    const row = document.createElement('div');
    row.className = 'dept-row';
    row.innerHTML = `
      <span style="width:14px;height:14px;border-radius:3px;background:${VLSM_COLORS[i % VLSM_COLORS.length]};display:inline-block;flex-shrink:0"></span>
      <input type="text"   placeholder="Departman adı" value="${d.name.replace(/"/g,'&quot;')}" data-i="${i}" data-f="name">
      <label>Host:</label>
      <input type="number" min="1" max="65534" value="${d.hosts}" data-i="${i}" data-f="hosts">
      <button class="btn-rm" data-i="${i}">Sil</button>`;
    list.appendChild(row);
  });
  list.querySelectorAll('input').forEach(inp => inp.addEventListener('input', e => {
    const i = +e.target.dataset.i, f = e.target.dataset.f;
    depts[i][f] = f === 'hosts' ? Math.max(1, parseInt(e.target.value) || 1) : e.target.value;
    renderVLSM();
  }));
  list.querySelectorAll('.btn-rm').forEach(btn => btn.addEventListener('click', e => {
    pushHistory('depts');
    depts.splice(+e.target.dataset.i, 1);
    renderDeptList(); renderVLSM();
  }));
}

function renderVLSM() {
  const out       = document.getElementById('vlsm-output');
  const baseInput = document.getElementById('vlsm-base');
  const base      = parseCIDR(baseInput.value);
  setInputValid(baseInput, !!base);

  if (!base)            { out.innerHTML = `<p class="warn">Geçersiz temel ağ. Örnek: 10.0.0.0/8</p>`; return; }
  if (depts.length === 0) { out.innerHTML = ''; return; }

  /* Adres alanı sınırları */
  const totalSize = base.pfx === 0 ? 4294967296 : Math.pow(2, 32 - base.pfx);
  const maxAddr   = base.pfx === 0 ? 0xFFFFFFFF : (base.net + totalSize - 1) >>> 0;

  const sorted  = [...depts].map((d, i) => ({ ...d, origIdx: i })).sort((a, b) => b.hosts - a.hosts);
  let cursor    = base.net >>> 0;
  const results = [];
  let addrFull  = false; /* adres taşması bayrağı */

  for (const d of sorted) {
    if (addrFull) {
      results.push({ ...d, error: 'Adres alanı doldu — temel ağ yeterli değil' });
      continue;
    }
    /* /31 P2P linkleri için RFC 3021: host + 0 (tüm adresler kullanılabilir) */
    const needed = d.hosts <= 2 ? d.hosts : d.hosts + 2;
    let bits = 0;
    while (Math.pow(2, bits) < needed) bits++;
    const pfx  = 32 - bits;
    const size = Math.pow(2, bits);

    if (pfx < base.pfx) {
      results.push({ ...d, error: 'Temel ağa sığmıyor (gerekli prefix çok küçük)' });
      continue;
    }

    /* Cursor'ı subnet sınırına hizala (alignment) */
    const aligned = Math.ceil(cursor / size) * size;
    const netAddr = aligned >>> 0;
    const bcAddr  = (netAddr + size - 1) >>> 0;

    /* Adres taşması kontrolü */
    if (netAddr > maxAddr || bcAddr > maxAddr) {
      /* Adres doldu — bu ve kalan tüm departmanları hata yap */
      results.push({ ...d, error: 'Adres alanı doldu — temel ağ yeterli değil' });
      addrFull = true;
      continue;
    }

    const usable = pfx === 32 ? 1 : pfx === 31 ? 2 : size - 2;
    // RFC 3021: /31'de her iki adres de kullanılabilir
    const first  = pfx === 31 ? n2ip(netAddr) : pfx === 32 ? n2ip(netAddr) : n2ip(netAddr + 1);
    const last   = pfx === 31 ? n2ip(bcAddr)  : pfx === 32 ? n2ip(netAddr) : n2ip(bcAddr - 1);
    results.push({ ...d, pfx, netAddr, bc: bcAddr, first, last, usable, size });
    cursor = (netAddr + size) >>> 0;
  }

  const usedSize    = results.reduce((s, r) => s + (r.size   || 0), 0);
  const totalUsable = results.reduce((s, r) => s + (r.error ? 0 : r.usable), 0);

  /* Orantı çubuğu */
  let barHTML = '';
  results.forEach(r => {
    if (r.error) return;
    const pct = (r.size / totalSize) * 100;
    const col = VLSM_COLORS[r.origIdx % VLSM_COLORS.length];
    barHTML += `<div class="vlsm-seg" style="width:${pct}%;background:${col}" title="${r.name}">${pct > 4 ? r.name : ''}</div>`;
  });
  const remPct = ((totalSize - usedSize) / totalSize) * 100;
  if (remPct > 0) barHTML += `<div class="vlsm-seg" style="width:${remPct}%;background:var(--color-border-tertiary)" title="Boş alan"></div>`;

  /* Tablo */
  let tableHTML = `<table class="vlsm-table"><thead><tr>
    <th>Departman</th><th>Ağ / Prefix</th><th>Subnet mask</th><th>İlk host</th><th>Son host</th><th>Broadcast</th><th>Kullanılabilir</th>
  </tr></thead><tbody>`;
  results.forEach(r => {
    const col = VLSM_COLORS[r.origIdx % VLSM_COLORS.length];
    if (r.error) {
      tableHTML += `<tr><td class="name"><span class="vlsm-color" style="background:${col}"></span>${r.name}</td><td colspan="6" style="color:var(--color-text-danger)">${r.error}</td></tr>`;
    } else {
      tableHTML += `<tr>
        <td class="name"><span class="vlsm-color" style="background:${col}"></span>${r.name}</td>
        <td>${n2ip(r.netAddr)}/${r.pfx}</td>
        <td>${mask2dec(r.pfx)}</td>
        <td>${r.first}</td><td>${r.last}</td><td>${r.pfx === 31 ? '—' : n2ip(r.bc)}</td>
        <td>${r.usable.toLocaleString('tr-TR')}</td>
      </tr>`;
    }
  });
  /* Toplam satırı */
  const effPct = totalSize > 0 ? ((usedSize / totalSize) * 100).toFixed(1) : '0.0';
  tableHTML += `
    <tr style="border-top:1px solid var(--color-border-secondary);font-weight:600">
      <td class="name" colspan="6" style="font-family:var(--font-sans);color:var(--color-text-secondary);font-size:11px">TOPLAM — ${effPct}% adres alanı kullanıldı</td>
      <td>${totalUsable.toLocaleString('tr-TR')}</td>
    </tr>`;
  tableHTML += `</tbody></table>`;

  out.innerHTML = `<div class="vlsm-bar-wrap" style="margin-top:1rem">${barHTML}</div>${tableHTML}`;
}

document.getElementById('btn-add-dept').addEventListener('click', () => {
  pushHistory('depts');
  depts.push({ name: 'Departman ' + (depts.length + 1), hosts: 20 });
  renderDeptList(); renderVLSM();
});
document.getElementById('btn-undo-vlsm').addEventListener('click', () => undoAction('depts'));
document.getElementById('vlsm-base').addEventListener('input', renderVLSM);

/* VLSM ↔ Ana Slider senkronizasyonu */
document.getElementById('btn-vlsm-sync').addEventListener('click', () => {
  const pfx     = parseInt(slider.value);
  const ipParts = parseIP(sharedIP);
  if (ipParts) {
    const mask = pfx === 0 ? 0 : (0xFFFFFFFF << (32 - pfx)) >>> 0;
    const net  = (ip2n(ipParts) & mask) >>> 0;
    document.getElementById('vlsm-base').value = n2ip(net) + '/' + pfx;
  } else {
    document.getElementById('vlsm-base').value = '10.0.0.0/' + pfx;
  }
  renderVLSM();
});

/* ══════════════════════════════════════════════
   SUPERNET
══════════════════════════════════════════════ */
let snets = ['192.168.0.0/24','192.168.1.0/24','192.168.2.0/24','192.168.3.0/24'];

function renderSNList() {
  const list = document.getElementById('sn-list');
  list.innerHTML = '';
  snets.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'sn-row';
    row.innerHTML = `<input type="text" value="${s}" placeholder="192.168.0.0/24" data-i="${i}" autocomplete="off" spellcheck="false"><button class="btn-rm" data-i="${i}">Sil</button>`;
    list.appendChild(row);
  });
  list.querySelectorAll('input').forEach(inp => inp.addEventListener('input', e => {
    snets[+e.target.dataset.i] = e.target.value;
    renderSupernet();
  }));
  list.querySelectorAll('.btn-rm').forEach(btn => btn.addEventListener('click', e => {
    pushHistory('snets');
    snets.splice(+e.target.dataset.i, 1);
    renderSNList(); renderSupernet();
  }));
}

function renderSupernet() {
  const out     = document.getElementById('sn-output');
  const warnEl  = document.getElementById('sn-prefix-warn');

  /* Orijinal index korunur — etiket araması doğru çalışır */
  const parsedWithIdx = snets
    .map((s, i) => ({ cidr: parseCIDR(s), idx: i, raw: s.trim() }))
    .filter(x => x.cidr !== null);

  if (parsedWithIdx.length < 2) {
    out.innerHTML = `<p class="warn" style="margin-top:1rem">En az 2 geçerli subnet girin.</p>`;
    warnEl.style.display = 'none';
    return;
  }

  /* Farklı prefix uyarısı */
  const allSamePfx = parsedWithIdx.every(p => p.cidr.pfx === parsedWithIdx[0].cidr.pfx);
  if (!allSamePfx) {
    warnEl.style.display = 'flex';
    warnEl.textContent   = '⚠️  Farklı prefix uzunlukları tespit edildi. Supernet teknik olarak hesaplanabilir ancak farklı boyutlu subnet\'ler karıştırıldığında route özeti alt-optimal olabilir.';
  } else {
    warnEl.style.display = 'none';
  }

  const nums = parsedWithIdx.map(p => p.cidr.net);
  let commonPfx = 0;
  for (let bit = 31; bit >= 0; bit--) {
    const val = (nums[0] >> bit) & 1;
    if (nums.every(n => ((n >> bit) & 1) === val)) commonPfx++;
    else break;
  }

  const superMask  = commonPfx === 0 ? 0 : (0xFFFFFFFF << (32 - commonPfx)) >>> 0;
  const superNet   = (nums[0] & superMask) >>> 0;
  const superBC    = (superNet | (~superMask >>> 0)) >>> 0;
  const superTotal = Math.pow(2, 32 - commonPfx);

  /* Bit karşılaştırması */
  let bitsHTML = '';
  parsedWithIdx.forEach(({ cidr, raw }) => {
    const bits = [];
    for (let i = 31; i >= 0; i--) bits.unshift((cidr.net >> i) & 1);
    bitsHTML += `<div class="sn-brow"><div class="sn-blbl">${raw}</div><div class="sn-bbits">`;
    bits.forEach((b, i) => { bitsHTML += `<div class="sb ${i < commonPfx ? 'match' : 'diff'}">${b}</div>`; });
    bitsHTML += `</div></div>`;
  });
  const superBits = [];
  for (let i = 31; i >= 0; i--) superBits.unshift((superNet >> i) & 1);
  bitsHTML += `<div class="sn-brow" style="margin-top:6px"><div class="sn-blbl" style="font-weight:500;color:var(--color-text-primary)">Supernet</div><div class="sn-bbits">`;
  superBits.forEach((b, i) => { bitsHTML += `<div class="sb ${i < commonPfx ? 'match' : ''}">${i < commonPfx ? b : '*'}</div>`; });
  bitsHTML += `</div></div>`;

  out.innerHTML = `
    <div class="sn-result">
      <div class="info-row" style="margin:0 0 1rem">
        ${ic('Supernet',       n2ip(superNet) + '/' + commonPfx)}
        ${ic('Subnet maskesi', mask2dec(commonPfx))}
        ${ic('Broadcast',      n2ip(superBC))}
        ${ic('Toplam IP',      superTotal.toLocaleString('tr-TR'))}
        ${ic('Ortak prefix',   commonPfx + ' bit')}
      </div>
      <div class="slbl">Bit karşılaştırması — mor: eşleşen, kırmızı: farklı</div>
      <div class="sn-bit-compare">${bitsHTML}</div>
    </div>`;
}

document.getElementById('btn-add-sn').addEventListener('click', () => {
  pushHistory('snets');
  snets.push(''); renderSNList(); renderSupernet();
});
document.getElementById('btn-undo-sn').addEventListener('click', () => undoAction('snets'));

/* ══════════════════════════════════════════════
   HOST → SUBNET
══════════════════════════════════════════════ */
function renderHostSubnet() {
  const needed = parseInt(document.getElementById('host-input').value) || 0;
  const out    = document.getElementById('host-output');
  if (needed < 1)        { out.innerHTML = '<p class="warn">En az 1 host girin.</p>'; return; }
  if (needed > 16777214) { out.innerHTML = '<p class="warn">IPv4\'te maksimum 16.777.214 kullanılabilir host bulunabilir (/8).</p>'; return; }

  let fitPfx = 32;
  for (let p = 1; p <= 32; p++) {
    const u = p === 32 ? 1 : p === 31 ? 2 : Math.pow(2, 32 - p) - 2;
    if (u >= needed) { fitPfx = p; break; }
  }

  const rows = [];
  for (let p = Math.max(1, fitPfx - 2); p <= Math.min(32, fitPfx + 2); p++) {
    const total  = Math.pow(2, 32 - p);
    const usable = p === 32 ? 1 : p === 31 ? 2 : total - 2;
    rows.push({ p, total, usable, mask: mask2dec(p), waste: usable - needed, fits: usable >= needed, exact: p === fitPfx });
  }

  const bitBar = Array.from({ length: 32 }, (_, i) => {
    const isNet = i < fitPfx;
    return `<div class="bit-cell ${isNet ? 'bit-net' : 'bit-host'}" style="height:24px;font-size:10px">${isNet ? '1' : '0'}</div>`;
  }).join('');

  const exactRow = rows.find(r => r.exact);
  let html = `
    <div class="hs-match">
      <div class="hs-match-label">✓ En uygun subnet</div>
      <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:.5rem">
        <span class="hs-prefix">/${fitPfx}</span>
        <span style="font-size:15px;font-family:var(--font-mono);color:var(--color-text-secondary)">${exactRow.mask}</span>
      </div>
      <div class="info-row" style="margin:0 0 .75rem">
        ${ic('Toplam IP',           exactRow.total.toLocaleString('tr-TR'))}
        ${ic('Kullanılabilir host', exactRow.usable.toLocaleString('tr-TR'))}
        ${ic('İsraf',               exactRow.waste.toLocaleString('tr-TR') + ' host')}
        ${ic('Host bitleri',        (32 - fitPfx) + ' bit')}
      </div>
      <div class="bit-grid">${bitBar}</div>
    </div>
    <div class="hs-col-hd"><span>Prefix</span><span>Subnet mask</span><span>Kullanılabilir</span><span>Toplam IP</span><span></span></div>
    <div class="hs-nearby">`;

  rows.forEach(r => {
    const tag = r.exact
      ? `<span class="hs-tag hs-tag-fit">✓ En uygun</span>`
      : r.fits
        ? `<span class="hs-tag hs-tag-big">▲ Fazla büyük</span>`
        : `<span class="hs-tag hs-tag-small">✗ Yetersiz</span>`;
    html += `<div class="hs-row ${r.exact ? 'exact' : ''} ${!r.fits ? 'small' : ''}">
      <span class="hs-pfx">/${r.p}</span>
      <span class="hs-val">${r.mask}</span>
      <span class="hs-val">${r.usable.toLocaleString('tr-TR')}</span>
      <span class="hs-val">${r.total.toLocaleString('tr-TR')}</span>
      <span>${tag}</span>
    </div>`;
  });
  html += `</div>`;
  out.innerHTML = html;
}

/* ══════════════════════════════════════════════
   BANT GENİŞLİĞİ HESAPLAYICI
══════════════════════════════════════════════ */
function fmtTime(s) {
  if (!isFinite(s) || s <= 0) return '—';
  if (s < 1)      return (s * 1000).toFixed(0) + ' ms';
  if (s < 60)     return s.toFixed(1) + ' saniye';
  if (s < 3600) {
    const m = Math.floor(s / 60), sc = Math.round(s % 60);
    return m + 'dk ' + (sc ? sc + 'sn' : '');
  }
  if (s < 86400) {
    const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
    return h + 'sa ' + (m ? m + 'dk' : '');
  }
  const d = Math.floor(s / 86400), h = Math.round((s % 86400) / 3600);
  return d + 'gün ' + (h ? h + 'sa' : '');
}
function fmtBps(b) {
  if (b >= 1e12) return (b / 1e12).toFixed(3) + ' Tbps';
  if (b >= 1e9)  return (b / 1e9).toFixed(3) + ' Gbps';
  if (b >= 1e6)  return (b / 1e6).toFixed(3) + ' Mbps';
  if (b >= 1e3)  return (b / 1e3).toFixed(2) + ' Kbps';
  return b.toFixed(0) + ' bps';
}
function fmtBytes2(b) {
  if (b >= 1e12) return (b / 1e12).toFixed(3) + ' TB';
  if (b >= 1e9)  return (b / 1e9).toFixed(3) + ' GB';
  if (b >= 1e6)  return (b / 1e6).toFixed(3) + ' MB';
  if (b >= 1e3)  return (b / 1e3).toFixed(2) + ' KB';
  return b.toFixed(0) + ' B';
}

function renderBW() {
  const rawSize  = parseFloat(document.getElementById('bw-size').value)      || 0;
  const sizeUnit = parseFloat(document.getElementById('bw-size-unit').value) || 1;
  const rawDown  = parseFloat(document.getElementById('bw-down').value)      || 0;
  const downUnit = parseFloat(document.getElementById('bw-down-unit').value) || 1;
  const rawUp    = parseFloat(document.getElementById('bw-up').value)        || 0;
  const upUnit   = parseFloat(document.getElementById('bw-up-unit').value)   || 1;
  const overhead = parseFloat(document.getElementById('bw-overhead').value)  || 1;

  /* Negatif değer koruması */
  if (rawSize < 0 || rawDown < 0 || rawUp < 0) {
    document.getElementById('bw-res-down').textContent     = 'Hata';
    document.getElementById('bw-res-up').textContent       = 'Hata';
    document.getElementById('bw-res-down-sub').textContent = 'Negatif değer girilemez';
    document.getElementById('bw-res-up-sub').textContent   = '';
    document.getElementById('bw-conv-grid').innerHTML      = '';
    return;
  }

  const sizeBytes     = rawSize * sizeUnit;
  const downBps       = rawDown * downUnit;
  const upBps         = rawUp   * upUnit;
  const effectiveBits = sizeBytes * 8 * overhead; /* Overhead dahil gerçek bit sayısı */
  const overheadLabel = overhead > 1 ? ` (+${Math.round((overhead - 1) * 100)}% overhead)` : '';

  const downSec = downBps > 0 ? effectiveBits / downBps : Infinity;
  document.getElementById('bw-res-down').textContent     = fmtTime(downSec);
  document.getElementById('bw-res-down-sub').textContent = downBps > 0
    ? fmtBps(downBps) + ' üzerinden ' + fmtBytes2(sizeBytes) + overheadLabel : '';

  const upSec = upBps > 0 ? effectiveBits / upBps : Infinity;
  document.getElementById('bw-res-up').textContent     = fmtTime(upSec);
  document.getElementById('bw-res-up-sub').textContent = upBps > 0
    ? fmtBps(upBps) + ' üzerinden ' + fmtBytes2(sizeBytes) + overheadLabel : '';

  const grid = document.getElementById('bw-conv-grid');
  if (sizeBytes > 0) {
    const b = sizeBytes;
    grid.innerHTML = [
      `${b.toFixed(0)} B`,
      `${(b / 1e3).toFixed(3)} KB`,
      `${(b / 1e6).toFixed(3)} MB`,
      `${(b / 1e9).toFixed(3)} GB`,
      `${(b / 1e12).toFixed(6)} TB`,
      `${(b * 8).toFixed(0)} bit`,
      `${(b * 8 / 1e3).toFixed(2)} Kbit`,
      `${(b * 8 / 1e6).toFixed(3)} Mbit`,
    ].map(v => `<div class="bw-conv-item">${v}</div>`).join('');
  } else {
    grid.innerHTML = '';
  }
}

/* ══════════════════════════════════════════════
   EVENT LISTENERS
══════════════════════════════════════════════ */

/* IP input'ları — paylaşılan state, döngü riski yok */
ipInput.addEventListener('input', () => {
  sharedIP       = ipInput.value;
  ipInputA.value = sharedIP;
  render();
});
ipInputA.addEventListener('input', () => {
  sharedIP      = ipInputA.value;
  ipInput.value = sharedIP;
  render();
});

slider.addEventListener('input', render);
divSlider.addEventListener('input', () => renderDivider(parseInt(slider.value)));
document.getElementById('host-input').addEventListener('input', renderHostSubnet);

['bw-size','bw-size-unit','bw-down','bw-down-unit','bw-up','bw-up-unit','bw-overhead'].forEach(id => {
  document.getElementById(id).addEventListener('input', renderBW);
});

/* Dark mode */
const dmToggle = document.getElementById('dm-toggle');
const crEl     = document.getElementById('app');
function applyDark(on) {
  crEl.classList.toggle('dark', on);
  document.body.classList.toggle('dark', on);
  document.documentElement.style.background = on ? '#13121F' : '';
  document.body.style.background            = on ? '#13121F' : '';
}
const savedDark = localStorage.getItem('cidr-dark');
if (savedDark === '1') { applyDark(true); dmToggle.checked = true; }
dmToggle.addEventListener('change', () => {
  const on = dmToggle.checked;
  applyDark(on);
  localStorage.setItem('cidr-dark', on ? '1' : '0');
});

/* About modal */
const aboutModal = document.getElementById('about-modal');
const aboutBtn   = document.getElementById('about-btn');
const aboutClose = document.getElementById('about-close');
aboutBtn.addEventListener('click',   () => aboutModal.classList.add('open'));
aboutClose.addEventListener('click', () => aboutModal.classList.remove('open'));
aboutModal.addEventListener('click', e => { if (e.target === aboutModal) aboutModal.classList.remove('open'); });

/* Klavye kısayolları */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') aboutModal.classList.remove('open');
  if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
    if (activePanel === 'vlsm')  { e.preventDefault(); undoAction('depts'); }
    if (activePanel === 'super') { e.preventDefault(); undoAction('snets'); }
  }
});

/* ══════════════════════════════════════════════
   BAŞLATMA (INIT)
══════════════════════════════════════════════ */
ipInput.value  = sharedIP;
ipInputA.value = sharedIP;
renderDeptList();
renderSNList();
updateUndoBtns();
render();                      // Ana render (IP, bit grid, AND, map, divider)
setTimeout(renderVLSM,        0);
setTimeout(renderSupernet,    0);
setTimeout(renderHostSubnet,  0);
setTimeout(renderBW,          0);
setTimeout(renderRange,       0);
setTimeout(renderOverlap,     0);

/* ══════════════════════════════════════════════
   IP ARALIĞI → CIDR
══════════════════════════════════════════════ */

function renderRange() {
  const startEl  = document.getElementById('range-start');
  const endEl    = document.getElementById('range-end');
  const warnEl   = document.getElementById('range-warn');
  const out      = document.getElementById('range-output');

  const sP = parseIP(startEl.value);
  const eP = parseIP(endEl.value);

  setInputValid(startEl, !!sP);
  setInputValid(endEl,   !!eP);

  if (!sP || !eP) {
    warnEl.textContent = 'Geçerli iki IPv4 adresi giriniz.';
    out.innerHTML = '';
    return;
  }

  const sN = ip2n(sP), eN = ip2n(eP);
  if (sN > eN) {
    warnEl.textContent = 'Başlangıç IP, bitiş IP\'den büyük olamaz.';
    out.innerHTML = '';
    return;
  }
  warnEl.textContent = '';

  /* CIDR blokları hesapla */
  const blocks = [];
  let cur = sN;
  while (cur <= eN) {
    let found = false;
    for (let pfx = 0; pfx <= 32; pfx++) {
      const size = Math.pow(2, 32 - pfx);
      if (cur % size === 0 && cur + size - 1 <= eN) {
        blocks.push({ net: cur, pfx, size });
        cur = (cur + size) >>> 0;
        found = true;
        break;
      }
    }
    if (!found) break;
  }

  const totalIPs = eN - sN + 1;

  /* Orantılı renk çubuğu */
  const RANGE_COLORS = ['#7F77DD','#1D9E75','#BA7517','#D85A30','#185FA5','#3B6D11','#993556','#5F5E5A'];
  let html = `<div class="slbl">CIDR dağılımı</div><div class="range-bar-wrap">`;
  blocks.forEach((b, i) => {
    const pct = (b.size / totalIPs) * 100;
    const col = RANGE_COLORS[i % RANGE_COLORS.length];
    html += `<div class="range-bar-seg" style="width:${pct}%;background:${col}" title="${n2ip(b.net)}/${b.pfx}"></div>`;
  });
  html += `</div>`;

  /* Her blok için bit ızgarası + info kartları
     10'dan fazla blokta bit grid saklanır — performans */
  const showGrid = blocks.length <= 10;

  blocks.forEach((b, i) => {
    const col      = RANGE_COLORS[i % RANGE_COLORS.length];
    const hostBits = 32 - b.pfx;
    const usable   = b.pfx === 32 ? 1 : b.pfx === 31 ? 2 : b.size - 2;

    let gridSection = '';
    if (showGrid) {
      const bits = [];
      for (let j = 31; j >= 0; j--) bits.unshift((b.net >> j) & 1);
      let gridHTML = '';
      bits.forEach((bit, idx) => {
        const isNet = idx < b.pfx;
        gridHTML += `<div class="bit-cell ${isNet ? 'bit-net' : 'bit-host'}">${isNet ? bit : (hostBits > 4 ? '*' : bit)}</div>`;
      });
      gridSection = `
        <div class="bit-scroll" style="margin-bottom:.75rem">
          <div class="odots" id="range-od-${i}"></div>
          <div class="bit-grid">${gridHTML}</div>
        </div>`;
    }

    html += `
      <div class="range-block">
        <div class="range-block-header" style="border-left:3px solid ${col}">
          <span class="range-block-badge" style="background:${col}">${i + 1}. BLOK</span>
          <span class="range-block-cidr">${n2ip(b.net)}/${b.pfx}</span>
          <span class="range-block-meta">${mask2dec(b.pfx)}</span>
        </div>
        ${gridSection}
        <div class="info-row">
          ${ic('Ağ adresi',       n2ip(b.net))}
          ${ic('Broadcast',       n2ip((b.net + b.size - 1) >>> 0))}
          ${ic('İlk host',        b.pfx >= 31 ? n2ip(b.net) : n2ip(b.net + 1))}
          ${ic('Son host',        b.pfx >= 31 ? n2ip((b.net + b.size - 1) >>> 0) : n2ip((b.net + b.size - 2) >>> 0))}
          ${ic('Toplam IP',       b.size.toLocaleString('tr-TR'))}
          ${ic('Kullanılabilir',  usable.toLocaleString('tr-TR'))}
        </div>
      </div>`;
  });

  /* Özet bilgi satırı */
  html += `<div class="info-row">
    ${ic('IP sayısı',   totalIPs.toLocaleString('tr-TR'))}
    ${ic('CIDR bloğu', blocks.length)}
  </div>`;

  out.innerHTML = html;

  if (showGrid) {
    blocks.forEach((_, i) => {
      const od = document.getElementById(`range-od-${i}`);
      if (od) makeOdots(od);
    });
  }
}

/* ══════════════════════════════════════════════
   SUBNET ÇAKIŞMA KONTROLÜ
══════════════════════════════════════════════ */

function renderOverlap() {
  const n1El   = document.getElementById('ov-net1');
  const n2El   = document.getElementById('ov-net2');
  const warnEl = document.getElementById('overlap-warn');
  const out    = document.getElementById('overlap-output');

  const c1 = parseCIDR(n1El.value);
  const c2 = parseCIDR(n2El.value);

  setInputValid(n1El, !!c1);
  setInputValid(n2El, !!c2);

  if (!c1 || !c2) {
    warnEl.textContent = 'Her iki alana da geçerli CIDR (ör: 192.168.1.0/24) giriniz.';
    out.innerHTML = '';
    return;
  }
  warnEl.textContent = '';

  const size1 = Math.pow(2, 32 - c1.pfx);
  const size2 = Math.pow(2, 32 - c2.pfx);
  const end1  = (c1.net + size1 - 1) >>> 0;
  const end2  = (c2.net + size2 - 1) >>> 0;

  const overlaps = c1.net <= end2 && end1 >= c2.net;

  /* Ortak prefix */
  let commonPfx = 0;
  for (let bit = 31; bit >= 0; bit--) {
    if (((c1.net >> bit) & 1) === ((c2.net >> bit) & 1)) commonPfx++;
    else break;
  }

  /* Sonuç kartı */
  const statusColor = overlaps ? '#D85A30' : '#1D9E75';
  const statusBg    = overlaps ? 'rgba(216,90,48,0.08)' : 'rgba(29,158,117,0.08)';

  let html = `
    <div class="ov-verdict" style="background:${statusBg};border-color:${statusColor}">
      <span class="ov-icon">${overlaps ? '⚠️' : '✅'}</span>
      <div class="ov-status" style="color:${statusColor}">${overlaps ? 'Çakışma Var' : 'Çakışma Yok'}</div>
    </div>`;

  /* Aynı ağ — tek segment özel durumu */
  const identical = c1.net === c2.net && c1.pfx === c2.pfx;

  /* Görsel adres çubuğu */
  const globalMin  = Math.min(c1.net, c2.net);
  const globalMax  = Math.max(end1, end2);
  const globalSize = Math.max(globalMax - globalMin + 1, 1);
  const left1  = ((c1.net - globalMin) / globalSize) * 100;
  const width1 = (size1 / globalSize) * 100;
  const left2  = ((c2.net - globalMin) / globalSize) * 100;
  const width2 = (size2 / globalSize) * 100;

  if (identical) {
    /* İki segment aynı: tek bar tam genişlikte göster, etiket üstüste */
    html += `
    <div class="ov-timeline">
      <div class="ov-track">
        <div class="ov-seg ov-seg1" style="left:0%;width:100%" title="${n2ip(c1.net)}/${c1.pfx}">/${c1.pfx} — Aynı ağ</div>
      </div>
      <div class="ov-timeline-labels">
        <span>${n2ip(c1.net)}</span>
        <span>${n2ip(end1)}</span>
      </div>
    </div>`;
  } else {
    html += `
    <div class="ov-timeline">
      <div class="ov-track">
        <div class="ov-seg ov-seg1" style="left:${left1}%;width:${Math.max(width1,2)}%" title="${n2ip(c1.net)}/${c1.pfx}">
          ${width1 > 8 ? `/${c1.pfx}` : ''}
        </div>
        <div class="ov-seg ov-seg2" style="left:${left2}%;width:${Math.max(width2,2)}%" title="${n2ip(c2.net)}/${c2.pfx}">
          ${width2 > 8 ? `/${c2.pfx}` : ''}
        </div>
      </div>
      <div class="ov-timeline-labels">
        <span>${n2ip(c1.net)}</span>
        <span>${n2ip(c2.net)}</span>
      </div>
    </div>`;
  }

  /* Bit karşılaştırması */
  const bits1 = [], bits2 = [];
  for (let i = 31; i >= 0; i--) {
    bits1.unshift((c1.net >> i) & 1);
    bits2.unshift((c2.net >> i) & 1);
  }

  function buildBitRow(bits, pfx, label) {
    let rowHTML = `<div class="sn-brow"><div class="sn-blbl">${label}</div><div class="sn-bbits">`;
    bits.forEach((b, i) => {
      let cls = '';
      if (i < commonPfx)        cls = 'match';   /* Her iki ağda ortak */
      else if (i < pfx)          cls = 'diff';    /* Bu ağın kendi ağ biti */
      /* host bitleri — boş stil */
      rowHTML += `<div class="sb ${cls}">${b}</div>`;
    });
    rowHTML += `</div></div>`;
    return rowHTML;
  }

  html += `
    <div class="slbl">Bit karşılaştırması</div>
    <div class="sn-bit-compare">
      ${buildBitRow(bits1, c1.pfx, n2ip(c1.net)+'/'+c1.pfx)}
      ${buildBitRow(bits2, c2.pfx, n2ip(c2.net)+'/'+c2.pfx)}
      <div class="ov-legend-row">
        <div class="sn-blbl"></div>
        <div class="ov-pfx-marker">
          ${Array.from({length:32}, (_,i) => {
            if (i === commonPfx - 1 && commonPfx > 0)
              return `<div class="ov-arrow" title="Ortak prefix sonu: bit ${i}">↑</div>`;
            return '<div></div>';
          }).join('')}
        </div>
      </div>
    </div>
  `;

  /* Detay kartları */
  html += `<div class="info-row" style="margin-top:1rem">
    ${ic('1. Ağ', n2ip(c1.net)+'/'+c1.pfx)}
    ${ic('1. Aralık', n2ip(c1.net)+'–'+n2ip(end1))}
    ${ic('1. Toplam IP', size1.toLocaleString('tr-TR'))}
    ${ic('2. Ağ', n2ip(c2.net)+'/'+c2.pfx)}
    ${ic('2. Aralık', n2ip(c2.net)+'–'+n2ip(end2))}
    ${ic('2. Toplam IP', size2.toLocaleString('tr-TR'))}
    ${ic('Ortak prefix', commonPfx + ' bit')}
  </div>`;

  /* Çakışma varsa çakışan aralığı da göster */
  if (overlaps) {
    const ovStart = Math.max(c1.net, c2.net);
    const ovEnd   = Math.min(end1, end2);
    html += `<div class="ov-overlap-box">
      <div class="slbl">Çakışan aralık</div>
      <div class="info-row">
        ${ic('İlk IP',    n2ip(ovStart))}
        ${ic('Son IP',    n2ip(ovEnd))}
        ${ic('IP sayısı', (ovEnd - ovStart + 1).toLocaleString('tr-TR'))}
      </div>
    </div>`;
  }

  out.innerHTML = html;
}


/* Event listeners — Range & Overlap (canlı güncelleme) */
['range-start','range-end'].forEach(id => {
  document.getElementById(id).addEventListener('input', renderRange);
});
['ov-net1','ov-net2'].forEach(id => {
  document.getElementById(id).addEventListener('input', renderOverlap);
});
