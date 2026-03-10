// Theme Toggle Logic
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Tab Switching Logic – event parametresi ile (window.event kaldırıldı)
function switchTab(tabId, event) {
    const panes = document.querySelectorAll('.tab-pane');
    const btns = document.querySelectorAll('.tab-btn');

    panes.forEach(el => el.classList.remove('active'));
    btns.forEach(el => el.classList.remove('active'));

    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }

    // Highlight the clicked button if it's a main tab button
    if (event && event.currentTarget && event.currentTarget.classList.contains('tab-btn')) {
        event.currentTarget.classList.add('active');
    }
}

// Helper: Parse SAN String to Forge Array
function parseSan(sanString) {
    if (!sanString || typeof sanString !== 'string') return [];
    return sanString.split(',').map(item => {
        const parts = item.trim().split(':');
        if (parts.length < 2) return null;
        const type = parts[0].trim().toUpperCase();
        const value = parts.slice(1).join(':').trim(); // Handle IP:port or complex strings
        if (!value) return null;
        if (type === 'DNS') return { type: 2, value: value };
        if (type === 'IP') return { type: 7, ip: value };
        if (type === 'URI') return { type: 6, value: value };
        if (type === 'EMAIL') return { type: 1, value: value };
        return null;
    }).filter(x => x);
}

// Helper: Generate KeyPair Promise
function generateKeyPairAsync(algOrBits) {
    return new Promise((resolve, reject) => {
        if (typeof algOrBits === 'string' && algOrBits.startsWith('ec')) {
            reject(new Error("ECDSA offline generation is not supported natively in this lightweight build without WebCrypto polyfills. Please use RSA."));
            return;
        }
        const bitSize = (typeof algOrBits === 'string' && algOrBits.startsWith('rsa')) ? parseInt(algOrBits.replace('rsa', '')) : parseInt(algOrBits);
        forge.pki.rsa.generateKeyPair({ bits: bitSize, workers: -1 }, (err, keypair) => {
            if (err) reject(err); else resolve(keypair);
        });
    });
}

// Helper: Export Private Key (Encrypted or Plain)
function exportPrivateKey(privateKey, passphrase, format = 'pkcs8') {
    if (passphrase) {
        // forge.pki.encryptRsaPrivateKey usually exports PKCS#8-like encrypted DER in PEM
        return forge.pki.encryptRsaPrivateKey(privateKey, passphrase, {
            algorithm: 'aes256',
            prfAlgorithm: 'sha256'
        });
    }
    if (format === 'pkcs1') {
        return forge.pki.privateKeyToPem(privateKey); // This is traditional PKCS#1 in forge
    }
    // Default to PKCS#8
    const rsaAsn1 = forge.pki.privateKeyToAsn1(privateKey);
    const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaAsn1);
    return forge.pki.privateKeyInfoToPem(privateKeyInfo);
}

// Helper: Create a robust Serial Number (Large Hex)
function generateSerialNumber() {
    return forge.util.bytesToHex(forge.random.getBytesSync(12));
}

// Helper: Build Subject Attributes from UI (Dynamic)
function getSubjectFromUI(prefix) {
    const cn = document.getElementById(`${prefix}_cn`).value.trim();
    const org = document.getElementById(`${prefix}_org`).value.trim();
    const ouEl = document.getElementById(`${prefix}_ou`);
    const ou = ouEl ? ouEl.value.trim() : '';
    const localityEl = document.getElementById(`${prefix}_locality`);
    const locality = localityEl ? localityEl.value.trim() : '';
    const stateEl = document.getElementById(`${prefix}_state`);
    const state = stateEl ? stateEl.value.trim() : '';
    const country = document.getElementById(`${prefix}_country`).value.trim();
    const emailEl = document.getElementById(`${prefix}_email`);
    const email = emailEl ? emailEl.value.trim() : '';

    const attrs = [
        { name: 'commonName', value: cn },
        { name: 'organizationName', value: org },
        { name: 'countryName', value: country }
    ];

    if (ou) attrs.push({ name: 'organizationalUnitName', value: ou });
    if (locality) attrs.push({ name: 'localityName', value: locality });
    if (state) attrs.push({ name: 'stateOrProvinceName', value: state });
    if (email) attrs.push({ name: 'emailAddress', value: email });

    return attrs;
}

// Helper: Get Message Digest (Hash) from UI – tutarlı return tipi
function getMdFromUI(prefix) {
    const hash = document.getElementById(`${prefix}_hash`).value;
    if (hash === 'sha256-pss') {
        return { md: forge.md.sha256.create(), pss: true };
    }
    let md;
    switch (hash) {
        case 'sha1': md = forge.md.sha1.create(); break;
        case 'sha384': md = forge.md.sha384.create(); break;
        case 'sha512': md = forge.md.sha512.create(); break;
        default: md = forge.md.sha256.create(); break;
    }
    return { md: md, pss: false };
}

// Helper: Merkezi PSS/Normal imzalama fonksiyonu (kod tekrarını önler)
function signWithMd(obj, privateKey, mdObj) {
    if (mdObj.pss) {
        const pss = forge.pss.create({
            md: forge.md.sha256.create(),
            mgf: forge.mgf.mgf1.create(forge.md.sha256.create()),
            saltLength: 20
        });
        obj.sign(privateKey, mdObj.md, pss);
    } else {
        obj.sign(privateKey, mdObj.md);
    }
}

// Helper: Input doğrulama (years, country)
function validateCommonInputs(prefix) {
    const yearsEl = document.getElementById(`${prefix}_years`);
    if (yearsEl) {
        const years = parseInt(yearsEl.value);
        if (isNaN(years) || years < 1 || years > 100) {
            throw new Error("Validity period must be between 1 and 100 years.");
        }
    }

    const countryEl = document.getElementById(`${prefix}_country`);
    if (countryEl) {
        const country = countryEl.value.trim();
        if (country && (country.length !== 2 || !/^[A-Za-z]{2}$/.test(country))) {
            throw new Error("Country Code must be exactly 2 letters (ISO 3166-1 alpha-2).");
        }
    }

    const emailEl = document.getElementById(`${prefix}_email`);
    if (emailEl) {
        const email = emailEl.value.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Email address format is invalid.");
        }
    }

    const cnEl = document.getElementById(`${prefix}_cn`);
    if (cnEl && !cnEl.value.trim()) {
        throw new Error("Common Name (CN) is required.");
    }
}

// UI Helper: Reset form fields – defaultChecked kullanımıyla düzeltildi
function resetForm(prefix) {
    const elements = document.querySelectorAll(`[id^="${prefix}_"]`);
    elements.forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
            if (el.type === 'checkbox') el.checked = el.defaultChecked;
            else if (el.tagName === 'SELECT') el.selectedIndex = 0;
            else if (!el.readOnly) el.value = el.defaultValue || '';
        }
    });
    const status = document.getElementById(`${prefix}_status`);
    const preview = document.getElementById(`${prefix}_preview`);
    if (status) status.innerText = '';
    if (preview) preview.style.display = 'none';
}

// UI Helper: Copy text to clipboard – event parametresiyle düzeltildi
function copyToClipboard(elementId, event) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event ? event.target : null;
        if (btn) {
            const oldText = btn.innerText;
            btn.innerText = "✓ Copied!";
            btn.style.background = "#00ff7f";
            btn.style.color = "#000";
            setTimeout(() => {
                btn.innerText = oldText;
                btn.style.background = "";
                btn.style.color = "";
            }, 2000);
        }
    }).catch(err => {
        alert("Copy failed: " + err);
    });
}

// Helper: Download blob and auto-revoke URL to prevent memory leaks
function downloadBlob(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 10000);
}

// Helper: Download text content as file
function downloadTextFile(content, filename, mimeType) {
    const link = document.createElement('a');
    link.href = `data:${mimeType};charset=utf-8,` + encodeURIComponent(content);
    link.download = filename;
    link.click();
}

// Helper: Inject Advanced Extensions (OCSP & CDP)
function injectAdvancedExtensions(exts, ocspUrl, cdpUrl) {
    if (cdpUrl) {
        exts.push({
            name: 'cRLDistributionPoints',
            altNames: [{ type: 6, value: cdpUrl }]
        });
    }
    if (ocspUrl) {
        const aia = forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, true, [
            forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, true, [
                forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.OID, false, forge.asn1.oidToDer('1.3.6.1.5.5.7.48.1').getBytes()),
                forge.asn1.create(forge.asn1.Class.CONTEXT_SPECIFIC, 6, false, ocspUrl) // type 6 is uniformResourceIdentifier
            ])
        ]);
        exts.push({
            id: '1.3.6.1.5.5.7.1.1', // authorityInfoAccess
            critical: false,
            value: forge.asn1.toDer(aia).getBytes()
        });
    }
}

// Helper: Build Key Usage & Extended Key Usage extensions from checkboxes
function buildKeyUsageExtensions(exts, prefix) {
    let keyUsage = [];
    const dsEl = document.getElementById(`${prefix}_ku_digitalsignature`) || document.getElementById('ku_digitalsignature');
    const keEl = document.getElementById(`${prefix}_ku_keyencipherment`) || document.getElementById('ku_keyencipherment');
    if (dsEl && dsEl.checked) keyUsage.push('digitalSignature');
    if (keEl && keEl.checked) keyUsage.push('keyEncipherment');
    if (keyUsage.length > 0) {
        exts.push({ name: 'keyUsage', digitalSignature: keyUsage.includes('digitalSignature'), keyEncipherment: keyUsage.includes('keyEncipherment'), critical: true });
    }

    let extKeyUsage = [];
    const saEl = document.getElementById(`${prefix}_ku_serverauth`) || document.getElementById('ku_serverauth');
    const caEl = document.getElementById(`${prefix}_ku_clientauth`) || document.getElementById('ku_clientauth');
    if (saEl && saEl.checked) extKeyUsage.push('serverAuth');
    if (caEl && caEl.checked) extKeyUsage.push('clientAuth');
    if (extKeyUsage.length > 0) {
        let ekuObj = { name: 'extKeyUsage' };
        extKeyUsage.forEach(val => ekuObj[val] = true);
        exts.push(ekuObj);
    }
}

// Helper: Decrypt CA private key from PEM
function decryptCaKey(caKeyPem, caPass) {
    if (caKeyPem.includes('ENCRYPTED')) {
        if (!caPass) throw new Error("Private Key is encrypted. Passphrase is required.");
        const key = forge.pki.decryptRsaPrivateKey(caKeyPem, caPass);
        if (!key) throw new Error("Decryption failed. Verify your CA Passphrase.");
        return key;
    }
    return forge.pki.privateKeyFromPem(caKeyPem);
}
