// Minimal static file server for local testing (no dependencies).
// Usage: node tools/serve.js [port]
var http = require('http');
var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var PORT = Number(process.argv[2] || 8099);

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

http.createServer(function (req, res) {
  var clean = decodeURIComponent(req.url.split('?')[0]);
  if (clean === '/') clean = '/index.html';
  var file = path.join(ROOT, path.normalize(clean).replace(/^(\.\.[\/\\])+/, ''));
  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 ' + clean);
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', function () {
  console.log('serving ' + ROOT + ' at http://127.0.0.1:' + PORT + '/');
});
