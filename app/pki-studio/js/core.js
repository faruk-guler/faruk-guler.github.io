// Theme Toggle Logic
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Tab Switching Logic
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Helper: Parse SAN String to Forge Array
function parseSan(sanString) {
    if (!sanString) return [];
    return sanString.split(',').map(item => {
        const parts = item.trim().split(':');
        if (parts.length < 2) return null;
        const type = parts[0].toUpperCase();
        const value = parts.slice(1).join(':').trim(); // Handle IP:port or complex strings
        if (type === 'DNS') return { type: 2, value: value };
        if (type === 'IP') return { type: 7, ip: value };
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
function exportPrivateKey(privateKey, passphrase) {
    if (passphrase) {
        return forge.pki.encryptRsaPrivateKey(privateKey, passphrase, {
            algorithm: 'aes256',
            prfAlgorithm: 'sha256'
        });
    }
    return forge.pki.privateKeyToPem(privateKey);
}

// Helper: Create a robust Serial Number (Large Hex)
function generateSerialNumber() {
    return forge.util.bytesToHex(forge.random.getBytesSync(12));
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
