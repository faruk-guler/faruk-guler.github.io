// ==========================================
// MODULE 1: SELF-SIGNED
// ==========================================
async function generateSelfSigned() {
    const btn = document.getElementById('btn_ss_generate');
    const loader = document.getElementById('ss_loader');
    const status = document.getElementById('ss_status');
    const previewBox = document.getElementById('ss_preview');
    const previewTxt = document.getElementById('ss_preview_text');

    try {
        btn.disabled = true; loader.style.display = 'block'; previewBox.style.display = 'none';

        validateCommonInputs('ss');

        const bitSize = document.getElementById('ss_keysize').value;
        const pass = document.getElementById('ss_pass').value;
        const years = parseInt(document.getElementById('ss_years').value);

        status.innerText = 'Initializing RSA Engine... Generating Asymmetric KeyPair...';
        await new Promise(r => setTimeout(r, 100));
        const keys = await generateKeyPairAsync(bitSize);

        status.innerText = 'Drafting X.509 Certificate & CSR Structure...';
        const cert = forge.pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = generateSerialNumber();
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + years);

        const attrs = getSubjectFromUI('ss');

        cert.setSubject(attrs);
        cert.setIssuer(attrs);

        // Also create a CSR
        const csr = forge.pki.createCertificationRequest();
        csr.publicKey = keys.publicKey;
        csr.setSubject(attrs);
        signWithMd(csr, keys.privateKey, getMdFromUI('ss'));
        const pemCsr = forge.pki.certificationRequestToPem(csr);

        const exts = [
            { name: 'basicConstraints', cA: false },
            { name: 'subjectKeyIdentifier' }
        ];

        buildKeyUsageExtensions(exts, 'ss');

        const sanList = parseSan(document.getElementById('ss_san').value);
        if (sanList.length > 0) exts.push({ name: 'subjectAltName', altNames: sanList });

        const ocspUrl = document.getElementById('ss_ocsp').value.trim();
        const cdpUrl = document.getElementById('ss_cdp').value.trim();
        injectAdvancedExtensions(exts, ocspUrl, cdpUrl);

        cert.setExtensions(exts);

        status.innerText = 'Calculating Hash & Signing Certificate...';
        signWithMd(cert, keys.privateKey, getMdFromUI('ss'));

        const pemCert = forge.pki.certificateToPem(cert);
        const ssFormat = document.getElementById('ss_format').value;
        const pemKey = exportPrivateKey(keys.privateKey, pass, ssFormat);

        status.innerText = 'Compressing and packaging archive...';
        const zip = new JSZip();
        zip.file("private" + (pass ? "_encrypted.key" : ".key"), pemKey);
        zip.file("certificate.crt", pemCert);
        zip.file("request.csr", pemCsr);

        const pfxPass = document.getElementById('ss_pfx_pass').value;
        if (pfxPass) {
            try {
                const p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, [cert], pfxPass, { generateLocalKeyId: true });
                const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
                zip.file("bundle.pfx", p12Der, { binary: true });
            } catch (e) { console.error("PFX Error:", e); }
        }

        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, `self_signed_${document.getElementById('ss_cn').value}.zip`);

        previewTxt.textContent = `=== Private Key ===\n${pemKey.substring(0, 180)}...\n\n=== Certificate (X.509 v3) ===\nSN: ${cert.serialNumber}\n${pemCert.substring(0, 300)}...`;
        previewBox.style.display = 'block';
        status.innerText = '';

    } catch (err) {
        status.innerHTML = `<span style="color:red">Error encountered: ${err.message}</span>`;
    } finally {
        btn.disabled = false; loader.style.display = 'none';
    }
}
