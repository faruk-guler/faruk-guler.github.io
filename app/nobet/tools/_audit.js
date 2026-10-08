const fs = require('fs'), path = require('path');
const ids = new Set();
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.js')) {
        const s = fs.readFileSync(p, 'utf8');
        let m; const re = /getElementById\(\s*['"]([^'"]+)['"]\s*\)/g;
        while ((m = re.exec(s))) ids.add(m[1]);
    }
});
walk(path.join(__dirname, '..', 'js'));
['btnTemplate', 'btnImport', 'btnExportStaff', 'btnExcel', 'btnPdf', 'btnGenerate', 'btnShuffle']
    .forEach((x) => ids.add(x));

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const present = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const missing = [...ids].filter((x) => !present.has(x)).sort();
console.log('JS istedigID:', ids.size);
console.log('HTML eksik ID:', missing.length ? missing.join(', ') : 'YOK');
