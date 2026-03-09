// ==========================================
// MODULE 8: CODE SIGNING
// ==========================================
async function generateCodeSigning() {
    const btn = document.getElementById('btn_cs_generate');
    const loader = document.getElementById('cs_loader');
    const status = document.getElementById('cs_status');
    const previewBox = document.getElementById('cs_preview');
    const previewTxt = document.getElementById('cs_preview_text');

    try {
        btn.disabled = true; loader.style.display = 'block'; previewBox.style.display = 'none';

        const bitSize = document.getElementById('cs_keysize').value;
        const pass = document.getElementById('cs_pass').value;
        const years = parseInt(document.getElementById('cs_years').value);

        status.innerText = 'Generating Developer Keypair...';
        await new Promise(r => setTimeout(r, 100));
        const keys = await generateKeyPairAsync(bitSize);

        status.innerText = 'Drafting Code Signing Certificate...';
        const cert = forge.pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = generateSerialNumber();
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + years);

        const attrs = [
            { name: 'commonName', value: document.getElementById('cs_cn').value },
            { name: 'countryName', value: document.getElementById('cs_country').value },
            { name: 'organizationName', value: document.getElementById('cs_org').value }
        ];
        cert.setSubject(attrs);
        cert.setIssuer(attrs);

        cert.setExtensions([
            { name: 'basicConstraints', cA: false },
            { name: 'keyUsage', digitalSignature: true, critical: true },
            { name: 'extendedKeyUsage', codeSigning: true, critical: true },
            { name: 'subjectKeyIdentifier' }
        ]);

        status.innerText = 'Digitally signing certificate...';
        cert.sign(keys.privateKey, forge.md.sha256.create());

        const pemCert = forge.pki.certificateToPem(cert);
        const pemKey = exportPrivateKey(keys.privateKey, pass);

        status.innerText = 'Compressing and packaging archive...';
        const zip = new JSZip();
        zip.file("code_signing" + (pass ? "_encrypted.key" : ".key"), pemKey);
        zip.file("code_signing.crt", pemCert);

        if (pass) {
            try {
                const p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, [cert], pass, { generateLocalKeyId: true });
                const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
                zip.file("code_signing.pfx", p12Der, { binary: true });
            } catch (e) { console.error("PFX Error:", e); }
        }

        const blob = await zip.generateAsync({ type: "blob" });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `codesign_${document.getElementById('cs_cn').value.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.zip`;
        link.click();

        previewTxt.textContent = `=== Code Signing Certificate ===\n${pemCert.substring(0, 300)}...`;
        previewBox.style.display = 'block';
        status.innerText = '';

    } catch (err) {
        status.innerHTML = `<span style="color:red">Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false; loader.style.display = 'none';
    }
}
