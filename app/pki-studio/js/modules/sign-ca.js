// ==========================================
// MODULE 3: SIGN WITH CA
// ==========================================
function triggerExtraction(pem) {
    try {
        const cert = forge.pki.certificateFromPem(pem);
        const org = cert.subject.getField('O') || cert.subject.getField('organizationName');
        const country = cert.subject.getField('C') || cert.subject.getField('countryName');
        if (org) document.getElementById('sub_org').value = org.value;
        if (country) document.getElementById('sub_country').value = country.value;
    } catch (e) { /* silent */ }
}

['input', 'paste', 'change'].forEach(evt => {
    document.getElementById('import_ca_crt').addEventListener(evt, function () {
        triggerExtraction(this.value);
    });
});

async function generateSubCert() {
    const btn = document.getElementById('btn_sub_generate');
    const loader = document.getElementById('sub_loader');
    const status = document.getElementById('sub_status');
    const previewBox = document.getElementById('sub_preview');
    const previewTxt = document.getElementById('sub_preview_text');

    try {
        btn.disabled = true; loader.style.display = 'block'; previewBox.style.display = 'none';

        const caCrtPem = document.getElementById('import_ca_crt').value.trim();
        const caKeyPem = document.getElementById('import_ca_key').value.trim();
        const caPass = document.getElementById('import_ca_pass').value;
        const years = parseInt(document.getElementById('sub_years').value);

        if (!caCrtPem || !caKeyPem) throw new Error("CA Certificate and Key are mandatory for signing.");

        status.innerText = 'Unwrapping Root CA Identity...';
        await new Promise(r => setTimeout(r, 100));

        const caCert = forge.pki.certificateFromPem(caCrtPem);

        let caPrivateKey;
        if (caKeyPem.includes('ENCRYPTED')) {
            if (!caPass) throw new Error("Private Key is encrypted. Passphrase is required.");
            caPrivateKey = forge.pki.decryptRsaPrivateKey(caKeyPem, caPass);
            if (!caPrivateKey) throw new Error("Decryption failed. Verify your CA Passphrase.");
        } else {
            caPrivateKey = forge.pki.privateKeyFromPem(caKeyPem);
        }

        status.innerText = 'Issuing Cryptographic Parameters for Subscriber...';
        const bitSize = document.getElementById('sub_keysize').value;
        const subKeys = await generateKeyPairAsync(bitSize);

        status.innerText = 'Applying Digital Seal... Certifying Subject Domain...';
        const cert = forge.pki.createCertificate();
        cert.publicKey = subKeys.publicKey;
        cert.serialNumber = generateSerialNumber();
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + years);

        cert.setSubject(getSubjectFromUI('sub'));

        cert.setIssuer(caCert.subject.attributes);

        const exts = [
            { name: 'basicConstraints', cA: false },
            { name: 'subjectKeyIdentifier' },
            { name: 'authorityKeyIdentifier', keyIdentifier: forge.pki.getPublicKeyFingerprint(caCert.publicKey) }
        ];

        let keyUsage = [];
        if (document.getElementById('sub_ku_digitalsignature').checked) keyUsage.push('digitalSignature');
        if (document.getElementById('sub_ku_keyencipherment').checked) keyUsage.push('keyEncipherment');
        if (keyUsage.length > 0) {
            exts.push({ name: 'keyUsage', digitalSignature: keyUsage.includes('digitalSignature'), keyEncipherment: keyUsage.includes('keyEncipherment'), critical: true });
        }

        let extKeyUsage = [];
        if (document.getElementById('sub_ku_serverauth').checked) extKeyUsage.push('serverAuth');
        if (document.getElementById('sub_ku_clientauth').checked) extKeyUsage.push('clientAuth');
        if (extKeyUsage.length > 0) {
            let ekuObj = { name: 'extKeyUsage' };
            extKeyUsage.forEach(val => ekuObj[val] = true);
            exts.push(ekuObj);
        }

        const sanList = parseSan(document.getElementById('sub_san').value);
        if (sanList.length > 0) exts.push({ name: 'subjectAltName', altNames: sanList });

        const ocspUrl = document.getElementById('sub_ocsp').value.trim();
        const cdpUrl = document.getElementById('sub_cdp').value.trim();
        injectAdvancedExtensions(exts, ocspUrl, cdpUrl);

        cert.setExtensions(exts);
        const subMdObj = getMdFromUI('sub');
        if (subMdObj.pss) {
            const pss = forge.pss.create({
                md: forge.md.sha256.create(),
                mgf: forge.mgf.mgf1.create(forge.md.sha256.create()),
                saltLength: 20
            });
            cert.sign(caPrivateKey, subMdObj.md, pss);
        } else {
            cert.sign(caPrivateKey, subMdObj);
        }

        const pemCert = forge.pki.certificateToPem(cert);
        const subFormat = document.getElementById('sub_format').value;
        const pemKey = exportPrivateKey(subKeys.privateKey, null, subFormat);

        status.innerText = 'Generating Trust Chain Bundle (FullChain)...';
        const zip = new JSZip();
        zip.file("server.key", pemKey);
        zip.file("server.crt", pemCert);
        zip.file("fullchain.pem", pemCert + "\n" + caCrtPem);

        const pfxPass = document.getElementById('sub_pfx_pass').value;
        if (pfxPass) {
            try {
                const p12Asn1 = forge.pkcs12.toPkcs12Asn1(subKeys.privateKey, [cert, caCert], pfxPass, { generateLocalKeyId: true });
                const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
                zip.file("server_bundle.pfx", p12Der, { binary: true });
            } catch (e) { console.error("PFX Error:", e); }
        }

        const blob = await zip.generateAsync({ type: "blob" });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${document.getElementById('sub_cn').value}_bundle.zip`;
        link.click();

        previewTxt.textContent = `=== SERVER CERTIFICATE ISSUED ===\nCA Issuer: ${caCert.subject.getField('CN').value}\nSubject: ${cert.subject.getField('CN').value}\nSerial: ${cert.serialNumber}\n\nZIP archive contains the FullTrust Chain file (fullchain.pem) for immediate server deployment.`;
        previewBox.style.display = 'block';
        status.innerText = '';

    } catch (err) {
        status.innerHTML = `<span style="color:red">Signing Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false; loader.style.display = 'none';
    }
}
