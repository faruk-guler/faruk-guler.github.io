// ==========================================
// MODULE 2: ROOT CA GENERATION
// ==========================================
async function generateRootCA() {
    const btn = document.getElementById('btn_ca_generate');
    const loader = document.getElementById('ca_loader');
    const status = document.getElementById('ca_status');
    const previewBox = document.getElementById('ca_preview');
    const previewTxt = document.getElementById('ca_preview_text');

    try {
        btn.disabled = true; loader.style.display = 'block'; previewBox.style.display = 'none';

        validateCommonInputs('ca');

        const bitSize = document.getElementById('ca_keysize').value;
        const pass = document.getElementById('ca_pass').value;

        status.innerText = 'Generating Enterprise Grade RSA Key-Pair... (May take several seconds)';
        await new Promise(r => setTimeout(r, 100));

        const keys = await generateKeyPairAsync(bitSize);

        status.innerText = 'Enforcing CA Constraints... Signing Authority Certificate...';
        const cert = forge.pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = generateSerialNumber();
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10);

        const attrs = getSubjectFromUI('ca');

        cert.setSubject(attrs);
        cert.setIssuer(attrs);

        const exts = [
            { name: 'basicConstraints', cA: true, critical: true },
            { name: 'keyUsage', keyCertSign: true, cRLSign: true, critical: true },
            { name: 'subjectKeyIdentifier' },
            { name: 'authorityKeyIdentifier', keyIdentifier: true }
        ];
        const ocspUrl = document.getElementById('ca_ocsp').value.trim();
        const cdpUrl = document.getElementById('ca_cdp').value.trim();
        injectAdvancedExtensions(exts, ocspUrl, cdpUrl);

        cert.setExtensions(exts);

        signWithMd(cert, keys.privateKey, getMdFromUI('ca'));

        const pemCert = forge.pki.certificateToPem(cert);
        const caFormat = document.getElementById('ca_format').value;
        const pemKey = exportPrivateKey(keys.privateKey, pass, caFormat);

        const zip = new JSZip();
        zip.file("Root_CA" + (pass ? "_Encrypted.key" : ".key"), pemKey);
        zip.file("Root_CA.crt", pemCert);
        const blob = await zip.generateAsync({ type: "blob" });

        downloadBlob(blob, `Enterprise_Root_CA.zip`);

        document.getElementById('import_ca_crt').value = pemCert;
        triggerExtraction(pemCert);

        previewTxt.textContent = `=== ROOT CA DEPLOYED ===\nIssuer: ${document.getElementById('ca_cn').value}\nSerial: ${cert.serialNumber}\nKey: ${bitSize} Bit RSA\n\n${pemCert}`;
        previewBox.style.display = 'block';
        status.innerText = '';

    } catch (err) {
        status.innerHTML = `<span style="color:red">Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false; loader.style.display = 'none';
    }
}
