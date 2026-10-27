'use strict';
// ---- Content payload ----
// Wi-Fi fields escape special characters with a backslash
function wifiEsc(v) { return v.replace(/([\\;:,"])/g, '\\$1'); }

function buildPayload() {
  const type = document.querySelector('input[name="ctype"]:checked').value;
  const val = (sel) => { const el = $(String(sel).replace(/^#/, '')); return el ? el.value.trim() : ''; };
  switch (type) {
    case 'text': {
      const t = val('#f-text');
      if (!t) throw new Error('Please enter text or a URL.');
      return t;
    }
    case 'wifi': {
      const ssid = val('#f-wifi-ssid');
      if (!ssid) throw new Error('Network name (SSID) is required.');
      const enc = $('f-wifi-enc').value;
      let p = 'WIFI:T:' + enc + ';S:' + wifiEsc(ssid) + ';';
      if (enc !== 'nopass') p += 'P:' + wifiEsc(val('#f-wifi-pass')) + ';';
      if ($('f-wifi-hidden').checked) p += 'H:true;';
      return p + ';';
    }
    case 'email': {
      const to = val('#f-email-to');
      if (!to) throw new Error('Recipient address is required.');
      const q = [];
      const subj = val('#f-email-subject'); if (subj) q.push('subject=' + encodeURIComponent(subj));
      const body = $('f-email-body').value.trim(); if (body) q.push('body=' + encodeURIComponent(body));
      return 'mailto:' + to + (q.length ? '?' + q.join('&') : '');
    }
    case 'sms': {
      const num = val('#f-sms-num');
      if (!num) throw new Error('Number is required.');
      return 'SMSTO:' + num + ':' + $('f-sms-msg').value.trim();
    }
    case 'tel': {
      const num = val('#f-tel-num');
      if (!num) throw new Error('Phone number is required.');
      return 'tel:' + num;
    }
    case 'geo': {
      const lat = val('#f-geo-lat'), lng = val('#f-geo-lng');
      if (lat === '' || lng === '') throw new Error('Latitude and longitude are required.');
      return 'geo:' + lat + ',' + lng;
    }
    case 'vcard': {
      const name = val('#f-vc-name');
      if (!name) throw new Error('Full name is required.');
      const ln = name.split(/\s+/); const fn = ln.length > 1 ? ln.pop() : '';
      const parts = ['BEGIN:VCARD', 'VERSION:3.0',
        'N:' + (ln.join(' ')) + ';' + fn + ';;;', 'FN:' + name];
      if (val('#f-vc-org')) parts.push('ORG:' + val('#f-vc-org'));
      if (val('#f-vc-tel')) parts.push('TEL;TYPE=CELL:' + val('#f-vc-tel'));
      if (val('#f-vc-email')) parts.push('EMAIL:' + val('#f-vc-email'));
      if (val('#f-vc-url')) parts.push('URL:' + val('#f-vc-url'));
      parts.push('END:VCARD');
      return parts.join('\r\n');
    }
  }
  throw new Error('Unknown content type.');
}
