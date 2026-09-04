import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '0.0.0.0';
const MIME = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif', '.ico':'image/x-icon',
  '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.txt':'text/plain; charset=utf-8'
};

function resolveRequest(urlPath) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(urlPath, 'http://local').pathname); }
  catch { return null; }
  const relative = pathname.replace(/^\/+/, '');
  let candidate = path.resolve(ROOT, relative || 'index.html');
  if (candidate !== ROOT && !candidate.startsWith(ROOT + path.sep)) return null;
  try {
    if (fs.statSync(candidate).isDirectory()) candidate = path.join(candidate, 'index.html');
  } catch {}
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  // Preserve the original React client-side routes when opened directly.
  if (!path.extname(pathname)) return path.join(ROOT, 'index.html');
  return null;
}

const server = http.createServer((req, res) => {
  const file = resolveRequest(req.url || '/');
  if (!file) {
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8', 'Cache-Control':'no-store'});
    res.end('Not Found');
    return;
  }
  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {'Content-Type':type, 'Cache-Control':'no-store'});
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); }).pipe(res);
});
server.listen(PORT, HOST, () => console.log(`BNB HEROES preservation: http://${HOST}:${PORT}`));
