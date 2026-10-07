/**
 * make-pdf-font.js - embeds the PDF text font for offline use.
 *
 * Run with: node tools/make-pdf-font.js
 *
 * jsPDF cannot load a font from a URL when the app runs from file://, so the TTF in
 * assets/ is converted into a plain JS file that assigns base64 to window.PDF_FONTS.
 * io.js uses it when present and falls back to the standard Helvetica + ASCII folding
 * when it is not, so a missing output file never breaks the app.
 *
 * Input : assets/Roboto-Regular.ttf  (optional: assets/Roboto-Bold.ttf)
 * Output: vendor/roboto.js  and  assets/LICENSE-Roboto.txt (taken from the font itself)
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SOURCES = [
    { style: 'regular', file: 'Roboto-Regular.ttf' },
    { style: 'bold', file: 'Roboto-Bold.ttf' }
];

/** Reads the font's name table so the license notice can travel with the build. */
function readNames(buf) {
    const numTables = buf.readUInt16BE(4);
    let nameOffset = -1;

    for (let i = 0; i < numTables; i++) {
        const record = 12 + i * 16;
        if (buf.toString('latin1', record, record + 4) === 'name') nameOffset = buf.readUInt32BE(record + 8);
    }
    if (nameOffset < 0) return {};

    const count = buf.readUInt16BE(nameOffset + 2);
    const strings = nameOffset + buf.readUInt16BE(nameOffset + 4);
    const names = {};

    const utf16BE = (from, length) => {
        let text = '';
        for (let i = 0; i + 1 < length; i += 2) text += String.fromCharCode(buf.readUInt16BE(from + i));
        return text;
    };

    for (let i = 0; i < count; i++) {
        const entry = nameOffset + 6 + i * 12;
        const nameId = buf.readUInt16BE(entry + 6);
        if (names[nameId]) continue;

        const length = buf.readUInt16BE(entry + 8);
        const at = strings + buf.readUInt16BE(entry + 10);
        names[nameId] = buf.readUInt16BE(entry) === 3
            ? utf16BE(at, length)
            : buf.toString('latin1', at, at + length);
    }
    return names;
}

const fonts = {};
const notices = [];

SOURCES.forEach(({ style, file }) => {
    const at = path.join(root, 'assets', file);
    if (!fs.existsSync(at)) {
        console.log(`atlandi (yok): assets/${file}`);
        return;
    }

    const buf = fs.readFileSync(at);
    if (buf.readUInt32BE(0) !== 0x00010000 && buf.toString('latin1', 0, 4) !== 'OTTO') {
        console.error(`HATA: assets/${file} geçerli bir TrueType/OpenType dosyası değil`);
        process.exit(1);
    }

    fonts[style] = buf.toString('base64');

    const names = readNames(buf);
    notices.push(`${file}\n  Font: ${names[1] || names[4] || file} ${names[2] || ''}`.trimEnd());
    if (names[0]) notices.push(`  Telif: ${names[0]}`);
    if (names[13]) notices.push(`  Lisans: ${names[13]}`);
    if (names[14]) notices.push(`  ${names[14]}`);
    console.log(`okundu: assets/${file} (${(buf.length / 1024).toFixed(0)} KB -> base64 ${(fonts[style].length / 1024).toFixed(0)} KB) | aile: ${names[1]}`);
});

if (!fonts.regular) {
    console.error('HATA: assets/Roboto-Regular.ttf bulunamadı - PDF yazısı ASCII yedeğe düşer.');
    process.exit(1);
}

const header = [
    '/*',
    ` * roboto.js - ÜRETİLMİŞ DOSYA, elle düzenlemeyin.`,
    ` * Kaynak: assets/Roboto-Regular.ttf (Apache License 2.0 - bkz. assets/LICENSE-Roboto.txt)`,
    ` * Yeniden üretmek için: node tools/make-pdf-font.js`,
    ` */`
].join('\n');

const out = `${header}\nwindow.PDF_FONTS = ${JSON.stringify(fonts)};\n`;
fs.writeFileSync(path.join(root, 'vendor', 'roboto.js'), out, 'utf8');
fs.writeFileSync(path.join(root, 'assets', 'LICENSE-Roboto.txt'), `${notices.join('\n')}\n`, 'utf8');

console.log(`yazildi: vendor/roboto.js (${(out.length / 1024).toFixed(0)} KB) + assets/LICENSE-Roboto.txt`);
