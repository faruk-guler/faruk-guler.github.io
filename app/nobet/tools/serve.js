/**
 * serve.js - gelistirme sunucusu (uygulama icin degil, sadece tarayicide acmak icin).
 *
 *   node tools/serve.js          -> http://127.0.0.1:8142
 *   node tools/serve.js 9000     -> baska port
 *
 * Uygulama tek basina da calisir: index.html'i tarayicida acmak yeterlidir.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.json': 'application/json; charset=utf-8',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf'
};

const root = path.join(__dirname, '..');
const port = Number(process.argv[2]) || 8142;

http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(root, url === '/' ? 'index.html' : url);

    // Dizin disi bir yol istenirse 404 (gelistirme sunucusu da olsa dosya sizdirmaz).
    if (!file.startsWith(root)) {
        res.writeHead(403).end('yasak');
        return;
    }

    fs.readFile(file, (error, body) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('yok');
            return;
        }
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' }).end(body);
    });
}).listen(port, '127.0.0.1', () => console.log(`Jupiter: http://127.0.0.1:${port}`));
