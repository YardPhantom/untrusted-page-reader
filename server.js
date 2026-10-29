// Tiny static server + URL fetch proxy. No dependencies. Node 18+.
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 3000, PUB = path.join(__dirname, 'public');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/fetch') {
    const target = u.searchParams.get('url') || '';
    if (!/^https?:\/\//i.test(target)) { res.writeHead(400); return res.end('http(s) URL required'); }
    try {
      const r = await fetch(target, { signal: AbortSignal.timeout(8000) });
      const body = (await r.text()).slice(0, 500000);
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }); return res.end(body);
    } catch (e) { res.writeHead(502); return res.end('fetch failed: ' + e.message); }
  }
  const p = path.normalize(path.join(PUB, u.pathname === '/' ? 'index.html' : u.pathname));
  if (!p.startsWith(PUB)) { res.writeHead(403); return res.end(); }
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' }); res.end(data);
  });
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
