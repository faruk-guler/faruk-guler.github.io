// ==========================================
// MODULE 7: FORMAT CONVERTER
// ==========================================
function convertFormat() {
    const input = document.getElementById('conv_input').value.trim();
    const status = document.getElementById('conv_status');
    if (!input) return;

    try {
        const msgs = forge.pem.decode(input);
        if (msgs.length === 0) throw new Error("No valid PEM format found.");

        // Convert first msg to DER
        const derBytes = msgs[0].body;
        let expectedExt = '.der';
        if (msgs[0].type.includes('CERTIFICATE REQUEST')) expectedExt = '.csr.der';
        else if (msgs[0].type.includes('CERTIFICATE')) expectedExt = '.cer';
        else if (msgs[0].type.includes('KEY')) expectedExt = '.key.der';

        const byteArrays = [];
        for (let offset = 0; offset < derBytes.length; offset += 512) {
            const slice = derBytes.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArrays.push(new Uint8Array(byteNumbers));
        }
        const blob = new Blob(byteArrays, { type: 'application/octet-stream' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `converted${expectedExt}`;
        link.click();

        status.innerHTML = `<span style="color:var(--accent-success)">Successfully converted ${msgs[0].type} to Binary. Check your downloads!</span>`;
        setTimeout(() => status.innerText = '', 4000);
    } catch (err) {
        status.innerHTML = `<span style="color:red">Format Error: ${err.message}</span>`;
    }
}
