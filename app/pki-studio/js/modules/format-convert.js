// ==========================================
// MODULE 7: FORMAT CONVERTER
// ==========================================
function triggerDerFileLoad() {
    document.getElementById('conv_der_file').click();
}

function handleDerFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const buffer = e.target.result;
        const bytes = new Uint8Array(buffer);
        let binaryString = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binaryString += String.fromCharCode(bytes[i]);
        }

        // Temporarily store binary string in text area (hidden from user view or base64 encoded for safety)
        document.getElementById('conv_input').value = forge.util.encode64(binaryString);
        document.getElementById('conv_status').innerHTML = `<span style="color:var(--accent-success)">DER File Loaded: ${file.name}. Ready to convert.</span>`;
    };
    reader.readAsArrayBuffer(file);
}

function convertFormat() {
    const input = document.getElementById('conv_input').value.trim();
    const mode = document.getElementById('conv_mode').value;
    const status = document.getElementById('conv_status');
    if (!input) return;

    try {
        if (mode === 'pem_to_der') {
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

        } else if (mode === 'der_to_pem') {
            // Check if input is Base64 (from our file reader)
            let binaryDer;
            try {
                binaryDer = forge.util.decode64(input);
            } catch (e) {
                throw new Error("Input must be a valid DER file loaded via the button.");
            }

            // Attempt to determine the type natively - try certificate first
            let pemType = 'CERTIFICATE'; // Default guess

            try {
                // Heuristic: Try to parse as certificate ASn1 
                const asn1 = forge.asn1.fromDer(binaryDer);
                // We're just validating it's a valid ASN1 sequence, forge handles the rest in PEM encode
            } catch (parseErr) {
                throw new Error("Failed to parse DER encoding.");
            }

            const pemOut = forge.pem.encode({
                type: pemType,
                body: binaryDer
            });

            const link = document.createElement('a');
            link.href = 'data:application/x-pem-file;charset=utf-8,' + encodeURIComponent(pemOut);
            link.download = `converted.pem`;
            link.click();

            status.innerHTML = `<span style="color:var(--accent-success)">Successfully converted DER to PEM format. Check your downloads!</span>`;
            setTimeout(() => status.innerText = '', 4000);
        }

    } catch (err) {
        status.innerHTML = `<span style="color:red">Format Error: ${err.message}</span>`;
    }
}
