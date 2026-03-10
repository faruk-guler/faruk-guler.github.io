// ==========================================
// MODULE 5: DECODE CERT
// ==========================================
function decodeX509Object() {
    const input = document.getElementById('decode_input').value.trim();
    const previewBox = document.getElementById('decode_preview');
    const previewTxt = document.getElementById('decode_preview_text');

    if (!input) return;
    previewBox.style.display = 'none';
    try {
        let out = "";
        if (input.includes('CERTIFICATE REQUEST')) {
            const csr = forge.pki.certificationRequestFromPem(input);
            out += "Type: Certificate Signing Request (CSR)\n";
            out += "Subject: " + csr.subject.attributes.map(a => `${a.shortName || a.name || a.type || 'Unknown'}=${a.value}`).join(', ') + "\n";

            // Public key info
            if (csr.publicKey && csr.publicKey.n) {
                out += "Public Key: RSA " + (csr.publicKey.n.bitLength()) + "-bit\n";
            }

            out += "Signature Verified: " + (csr.verify() ? "YES Valid ✅" : "NO Invalid ❌") + "\n";
            const reqExt = csr.getAttribute({ name: 'extensionRequest' });
            if (reqExt && reqExt.extensions) {
                out += "\nRequested Extensions:\n";
                reqExt.extensions.forEach(e => {
                    out += ` ↳ ${e.name} ` + (e.altNames ? `[${e.altNames.map(x => x.value || x.ip).join(', ')}]` : "") + "\n";
                });
            }
        } else if (input.includes('PRIVATE KEY')) {
            out += "Type: RSA Private Key\n";
            if (input.includes('ENCRYPTED')) {
                out += "Status: ENCRYPTED (Password protected format) 🔒\n";
                out += "Encryption: AES-256 PKCS#8\n";
            } else {
                out += "Status: Unencrypted / Plaintext ⚠️\n";
                try {
                    const key = forge.pki.privateKeyFromPem(input);
                    out += "Key Size: " + key.n.bitLength() + "-bit\n";
                    out += "Format: " + (input.includes('RSA PRIVATE KEY') ? "PKCS#1 (Traditional)" : "PKCS#8 (Modern)") + "\n";
                } catch (keyErr) {
                    out += "Note: Could not extract key details.\n";
                }
            }
        } else if (input.includes('CERTIFICATE')) {
            const cert = forge.pki.certificateFromPem(input);
            out += "Type: X.509 Digital Certificate\n";
            out += "Version: v" + (cert.version + 1) + "\n";
            out += "Subject: " + cert.subject.attributes.map(a => `${a.shortName || a.name || a.type || 'Unknown'}=${a.value}`).join(', ') + "\n";
            out += "Issuer: " + cert.issuer.attributes.map(a => `${a.shortName || a.name || a.type || 'Unknown'}=${a.value}`).join(', ') + "\n";
            out += "Serial Number: " + cert.serialNumber + "\n\n";
            out += "Valid From: " + cert.validity.notBefore.toUTCString() + "\n";
            out += "Valid To:   " + cert.validity.notAfter.toUTCString() + "\n";

            // Public key info
            if (cert.publicKey && cert.publicKey.n) {
                out += "Public Key: RSA " + cert.publicKey.n.bitLength() + "-bit\n";
            }

            // Self-signed check
            const isSelfSigned = cert.subject.hash === cert.issuer.hash;
            out += "Self-Signed: " + (isSelfSigned ? "Yes" : "No") + "\n";

            const now = new Date();
            const daysLeft = Math.floor((cert.validity.notAfter - now) / (1000 * 60 * 60 * 24));

            if (now < cert.validity.notBefore) {
                out += `Status: NOT YET VALID (Starts in the future) ⏳\n\n`;
            } else if (now > cert.validity.notAfter) {
                out += `Status: EXPIRED! ❌\n\n`;
            } else {
                out += `Status: Valid (${daysLeft} days left) ✅\n\n`;
            }

            out += "Extensions:\n";
            cert.extensions.forEach(e => {
                let val = "";
                if (e.name === 'subjectAltName') val = e.altNames.map(x => x.value || x.ip).join(', ');
                else if (e.name === 'basicConstraints') val = `CA: ${e.cA || false}` + (e.pathLenConstraint !== undefined ? `, pathLen: ${e.pathLenConstraint}` : '');
                else if (e.name === 'keyUsage') {
                    let usages = [];
                    if (e.digitalSignature) usages.push('digitalSignature');
                    if (e.keyEncipherment) usages.push('keyEncipherment');
                    if (e.keyCertSign) usages.push('keyCertSign');
                    if (e.cRLSign) usages.push('cRLSign');
                    if (e.dataEncipherment) usages.push('dataEncipherment');
                    if (e.nonRepudiation) usages.push('nonRepudiation');
                    val = usages.length > 0 ? usages.join(', ') : 'Present';
                }
                else if (e.name === 'extKeyUsage') {
                    let usages = [];
                    if (e.serverAuth) usages.push('serverAuth');
                    if (e.clientAuth) usages.push('clientAuth');
                    if (e.codeSigning) usages.push('codeSigning');
                    if (e.emailProtection) usages.push('emailProtection');
                    val = usages.length > 0 ? usages.join(', ') : 'Present';
                }
                else val = "Present";
                out += ` ↳ ${e.name}${e.critical ? ' [CRITICAL]' : ''}: ${val}\n`;
            });
        } else {
            out = "Unknown PEM format. Ensure you pasted a valid block.";
        }

        previewTxt.textContent = out;
        previewBox.style.display = 'block';
    } catch (e) {
        previewTxt.textContent = "Decode Failed: " + e.message;
        previewBox.style.display = 'block';
    }
}
