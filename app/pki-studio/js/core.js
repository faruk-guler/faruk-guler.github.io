// Theme Toggle Logic
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Tab Switching Logic
function switchTab(tabId) {
    const panes = document.querySelectorAll('.tab-pane');
    const btns = document.querySelectorAll('.tab-btn');

    panes.forEach(el => el.classList.remove('active'));
    btns.forEach(el => el.classList.remove('active'));

    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }

    // Highlighting the button if it's a main menu tab
    if (window.event && window.event.currentTarget) {
        const btn = window.event.currentTarget;
        if (btn.classList.contains('tab-btn')) {
            btn.classList.add('active');
        }
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
    const cn = document.getElementById(`${prefix}_cn`).value;
    const org = document.getElementById(`${prefix}_org`).value;
    const ou = document.getElementById(`${prefix}_ou`) ? document.getElementById(`${prefix}_ou`).value : '';
    const locality = document.getElementById(`${prefix}_locality`) ? document.getElementById(`${prefix}_locality`).value : '';
    const state = document.getElementById(`${prefix}_state`) ? document.getElementById(`${prefix}_state`).value : '';
    const country = document.getElementById(`${prefix}_country`).value;
    const email = document.getElementById(`${prefix}_email`) ? document.getElementById(`${prefix}_email`).value : '';

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

// Helper: Get Message Digest (Hash) from UI
function getMdFromUI(prefix) {
    const hash = document.getElementById(`${prefix}_hash`).value;
    if (hash === 'sha256-pss') {
        // Return a special object or hint that PSS should be used
        return { md: forge.md.sha256.create(), pss: true };
    }
    switch (hash) {
        case 'sha1': return forge.md.sha1.create();
        case 'sha384': return forge.md.sha384.create();
        case 'sha512': return forge.md.sha512.create();
        default: return forge.md.sha256.create();
    }
}

// UI Helper: Reset form fields
function resetForm(prefix) {
    const elements = document.querySelectorAll(`[id^="${prefix}_"]`);
    elements.forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
            if (el.type === 'checkbox') el.checked = false;
            else if (el.tagName === 'SELECT') el.selectedIndex = 0;
            else if (!el.readOnly) el.value = el.defaultValue || '';
        }
    });
    const status = document.getElementById(`${prefix}_status`);
    const preview = document.getElementById(`${prefix}_preview`);
    if (status) status.innerText = '';
    if (preview) preview.style.display = 'none';
}

// UI Helper: Copy text to clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        if (window.event && window.event.target) {
            const btn = window.event.target;
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
