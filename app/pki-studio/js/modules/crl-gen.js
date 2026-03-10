// ==========================================
// MODULE 6: CRL GENERATOR
// ==========================================
function generateCRL() {
    const btn = document.getElementById('btn_crl_generate');
    const status = document.getElementById('crl_status');
    const previewBox = document.getElementById('crl_preview');
    const previewTxt = document.getElementById('crl_preview_text');
    const loader = document.getElementById('crl_loader');

    try {
        btn.disabled = true; status.innerText = 'Initializing...';
        if (loader) loader.style.display = 'block';
        previewBox.style.display = 'none';
        const caCrtPem = document.getElementById('crl_ca_crt').value.trim();
        const caKeyPem = document.getElementById('crl_ca_key').value.trim();
        const caPass = document.getElementById('crl_ca_pass').value;
        const serialsRaw = document.getElementById('crl_serials').value.trim();
        const format = document.getElementById('crl_format').value;

        if (!caCrtPem || !caKeyPem || !serialsRaw) throw new Error("Please provide CA details and at least one Serial Number.");

        const caCert = forge.pki.certificateFromPem(caCrtPem);
        const caPrivateKey = decryptCaKey(caKeyPem, caPass);

        status.innerText = 'Drafting CRL...';
        const crl = forge.pki.createCertificateRevocationList();
        crl.setIssuer(caCert.subject.attributes);
        crl.thisUpdate = new Date();
        crl.nextUpdate = new Date();
        crl.nextUpdate.setFullYear(crl.thisUpdate.getFullYear() + 1);

        const serials = serialsRaw.split(',').map(s => s.trim().toUpperCase());
        let addedCount = 0;
        for (const sn of serials) {
            if (!sn) continue;
            crl.addRevokedCertificate({
                serialNumber: sn,
                revocationDate: new Date()
            });
            addedCount++;
        }
        if (addedCount === 0) throw new Error("No valid serial numbers parsed.");

        // Add CRL extensions – CRL Number as proper hex string
        const crlNumberHex = forge.util.bytesToHex(forge.random.getBytesSync(4));
        crl.setExtensions([
            { name: 'cRLNumber', value: crlNumberHex }
        ]);

        status.innerText = 'Signing CRL...';
        crl.sign(caPrivateKey, forge.md.sha256.create());

        let fileData, fileName;
        if (format === 'pem') {
            fileData = forge.pki.crlToPem(crl);
            fileName = 'list.crl.pem';
            previewTxt.textContent = `CRL successfully exported as PEM.\nTotal Revoked: ${addedCount}\n\n${fileData.substring(0, 300)}...`;
            downloadTextFile(fileData, fileName, 'application/x-pem-file');
        } else {
            const asn1 = forge.pki.crlToAsn1(crl);
            const der = forge.asn1.toDer(asn1).getBytes();
            const byteArrays = [];
            for (let offset = 0; offset < der.length; offset += 512) {
                const slice = der.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                byteArrays.push(new Uint8Array(byteNumbers));
            }
            fileData = new Blob(byteArrays, { type: 'application/pkix-crl' });
            fileName = 'root.crl';
            previewTxt.textContent = `CRL encoded in Binary DER format.\nSize: ${der.length} bytes\nTotal Revoked: ${addedCount}`;
            downloadBlob(fileData, fileName);
        }

        previewBox.style.display = 'block';
        status.innerText = '';
    } catch (err) {
        status.innerHTML = `<span style="color:red">Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false;
        if (loader) loader.style.display = 'none';
    }
}
