// Local-only fault fixture for the built application; never used by Vite or production.
// Start: node scripts/acceptance-server.mjs
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Permissions-Policy', 'clipboard-write=()');
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1:5181').pathname);
    const path = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if (/\.(mp4|jpg|jpeg|png|webp)$/i.test(path)) { res.writeHead(404).end('Acceptance fixture: unavailable media'); return; }
    const info = await stat(path);
    if (!info.isFile()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Content-Length': info.size });
    createReadStream(path).pipe(res);
  } catch { res.writeHead(404).end(); }
}).listen(5181, '127.0.0.1', () => console.log('Fault fixture http://127.0.0.1:5181 — raster/video 404, clipboard denied'));
