// ==========================================
// MODULE 4: SIGN CSR
// ==========================================
async function signCsrWithCA() {
    const btn = document.getElementById('btn_csr_generate');
    const loader = document.getElementById('csr_loader');
    const status = document.getElementById('csr_status');
    const previewBox = document.getElementById('csr_preview');
    const previewTxt = document.getElementById('csr_preview_text');

    try {
        btn.disabled = true; loader.style.display = 'block'; previewBox.style.display = 'none';

        const caCrtPem = document.getElementById('csr_ca_crt').value.trim();
        const caKeyPem = document.getElementById('csr_ca_key').value.trim();
        const caPass = document.getElementById('csr_ca_pass').value;
        const csrPem = document.getElementById('csr_input').value.trim();
        const years = parseInt(document.getElementById('csr_years').value);

        if (!caCrtPem || !caKeyPem || !csrPem) throw new Error("CA files and CSR are mandatory.");

        status.innerText = 'Verifying CSR Signature...';
        await new Promise(r => setTimeout(r, 100));

        const csr = forge.pki.certificationRequestFromPem(csrPem);
        if (!csr.verify()) throw new Error("CSR Signature is invalid or missing.");

        const caCert = forge.pki.certificateFromPem(caCrtPem);
        let caPrivateKey;
        if (caKeyPem.includes('ENCRYPTED')) {
            if (!caPass) throw new Error("Private Key is encrypted. Passphrase is required.");
            caPrivateKey = forge.pki.decryptRsaPrivateKey(caKeyPem, caPass);
            if (!caPrivateKey) throw new Error("Decryption failed. Verify your CA Passphrase.");
        } else {
            caPrivateKey = forge.pki.privateKeyFromPem(caKeyPem);
        }

        status.innerText = 'Signing Certificate from CSR...';
        const cert = forge.pki.createCertificate();
        cert.publicKey = csr.publicKey;
        cert.serialNumber = generateSerialNumber();
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + years);

        cert.setSubject(csr.subject.attributes);
        cert.setIssuer(caCert.subject.attributes);

        const exts = [
            { name: 'basicConstraints', cA: false },
            { name: 'keyUsage', digitalSignature: true, keyEncipherment: true, critical: true },
            { name: 'extendedKeyUsage', serverAuth: true, clientAuth: true },
            { name: 'subjectKeyIdentifier' },
            { name: 'authorityKeyIdentifier', keyIdentifier: forge.pki.getPublicKeyFingerprint(caCert.publicKey) }
        ];

        const sanList = parseSan(document.getElementById('csr_san').value);
        if (sanList.length > 0) {
            exts.push({ name: 'subjectAltName', altNames: sanList });
        } else {
            const reqExt = csr.getAttribute({ name: 'extensionRequest' });
            if (reqExt && reqExt.extensions) {
                const sanExt = reqExt.extensions.find(e => e.name === 'subjectAltName');
                if (sanExt) exts.push(sanExt);
            }
        }

        const ocspUrl = document.getElementById('csr_ocsp').value.trim();
        const cdpUrl = document.getElementById('csr_cdp').value.trim();
        injectAdvancedExtensions(exts, ocspUrl, cdpUrl);

        cert.setExtensions(exts);
        cert.sign(caPrivateKey, forge.md.sha256.create());

        const pemCert = forge.pki.certificateToPem(cert);

        const cnAttr = csr.subject.getField('CN');
        const cnOut = cnAttr ? cnAttr.value : 'signed_cert';

        const link = document.createElement('a');
        link.href = 'data:application/x-pem-file;charset=utf-8,' + encodeURIComponent(pemCert);
        link.download = `${cnOut}.crt`;
        link.click();

        previewTxt.textContent = `=== TARGET CERTIFICATE GENERATED FROM CSR ===\nIssuer: ${caCert.subject.getField('CN').value}\nSubject: ${cnOut}\nSerial: ${cert.serialNumber}\n\n${pemCert}`;
        previewBox.style.display = 'block';
        status.innerText = '';

    } catch (err) {
        status.innerHTML = `<span style="color:red">CSR Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false; loader.style.display = 'none';
    }
}
