// ==========================================
// MODULE 10: CSR GENERATOR (Standalone)
// ==========================================
async function generateCSR() {
    const btn = document.getElementById('btn_csrgen_generate');
    const loader = document.getElementById('csrgen_loader');
    const status = document.getElementById('csrgen_status');
    const previewBox = document.getElementById('csrgen_preview');
    const previewTxt = document.getElementById('csrgen_preview_text');

    try {
        btn.disabled = true; loader.style.display = 'block'; previewBox.style.display = 'none';

        validateCommonInputs('csrgen');

        const bitSize = document.getElementById('csrgen_keysize').value;
        const pass = document.getElementById('csrgen_pass').value;
        const years = parseInt(document.getElementById('csrgen_years').value) || 1;

        status.innerText = 'Generating RSA Key Pair...';
        await new Promise(r => setTimeout(r, 100));
        const keys = await generateKeyPairAsync(bitSize);

        status.innerText = 'Drafting Certificate Signing Request (CSR)...';

        const csr = forge.pki.createCertificationRequest();
        csr.publicKey = keys.publicKey;

        const attrs = getSubjectFromUI('csrgen');
        csr.setSubject(attrs);

        // Build CSR extensions (SAN, Key Usage)
        const csrExts = [];

        // SAN
        const sanList = parseSan(document.getElementById('csrgen_san').value);
        if (sanList.length > 0) {
            csrExts.push({ name: 'subjectAltName', altNames: sanList });
        }

        // Key Usage
        let keyUsage = {};
        if (document.getElementById('csrgen_ku_digitalsignature').checked) keyUsage.digitalSignature = true;
        if (document.getElementById('csrgen_ku_keyencipherment').checked) keyUsage.keyEncipherment = true;
        if (Object.keys(keyUsage).length > 0) {
            keyUsage.name = 'keyUsage';
            keyUsage.critical = true;
            csrExts.push(keyUsage);
        }

        // Extended Key Usage
        let extKeyUsage = {};
        if (document.getElementById('csrgen_ku_serverauth').checked) extKeyUsage.serverAuth = true;
        if (document.getElementById('csrgen_ku_clientauth').checked) extKeyUsage.clientAuth = true;
        if (document.getElementById('csrgen_ku_codesigning').checked) extKeyUsage.codeSigning = true;
        if (document.getElementById('csrgen_ku_emailprotection').checked) extKeyUsage.emailProtection = true;
        if (Object.keys(extKeyUsage).length > 0) {
            extKeyUsage.name = 'extKeyUsage';
            csrExts.push(extKeyUsage);
        }

        // Attach extensions to CSR via extensionRequest attribute
        if (csrExts.length > 0) {
            csr.setAttributes([{
                name: 'extensionRequest',
                extensions: csrExts
            }]);
        }

        // Sign CSR
        status.innerText = 'Signing CSR with Private Key...';
        signWithMd(csr, keys.privateKey, getMdFromUI('csrgen'));

        const pemCsr = forge.pki.certificationRequestToPem(csr);
        const csrFormat = document.getElementById('csrgen_format').value;
        const pemKey = exportPrivateKey(keys.privateKey, pass, csrFormat);

        // Package ZIP
        status.innerText = 'Packaging CSR & Private Key...';
        const zip = new JSZip();
        const cnValue = document.getElementById('csrgen_cn').value.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
        zip.file(`${cnValue}.csr`, pemCsr);
        zip.file(`${cnValue}${pass ? '_encrypted' : ''}.key`, pemKey);

        // Also include a readme
        const readme = `CSR Generation Summary
======================
Common Name: ${document.getElementById('csrgen_cn').value}
Organization: ${document.getElementById('csrgen_org').value}
Key Algorithm: ${bitSize}
Key Format: ${csrFormat.toUpperCase()}
Private Key: ${pass ? 'ENCRYPTED (AES-256)' : 'UNENCRYPTED'}
Suggested Validity: ${years} year(s)

Files:
  ${cnValue}.csr          - Certificate Signing Request (send to CA)
  ${cnValue}${pass ? '_encrypted' : ''}.key  - Private Key (KEEP SAFE!)

Next Steps:
  1. Send the .csr file to your Certificate Authority
  2. Keep the .key file private and secure
  3. Once you receive the signed certificate (.crt), use it with your private key
`;
        zip.file("README.txt", readme);

        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, `csr_${cnValue}.zip`);

        // Preview
        const sanDisplay = document.getElementById('csrgen_san').value.trim();
        previewTxt.textContent =
            `=== CSR Generated Successfully ===\n` +
            `Subject: ${attrs.map(a => `${a.name}=${a.value}`).join(', ')}\n` +
            `Key: ${bitSize.toUpperCase()}\n` +
            (sanDisplay ? `SAN: ${sanDisplay}\n` : '') +
            `Private Key: ${pass ? 'Encrypted' : 'Plaintext'}\n\n` +
            `${pemCsr}`;

        previewBox.style.display = 'block';
        status.innerText = '';

    } catch (err) {
        status.innerHTML = `<span style="color:red">CSR Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false; loader.style.display = 'none';
    }
}
