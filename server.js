const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.JPG': 'image/jpeg',
  '.JPEG': 'image/jpeg',
  '.png': 'image/png',
  '.PNG': 'image/png',
  '.webp': 'image/webp',
  '.WEBP': 'image/webp',
  '.avif': 'image/avif',
  '.AVIF': 'image/avif',
  '.gif': 'image/gif',
  '.GIF': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Redirect http://localhost:<port>/ to http://localhost:<port>/index.html
  if (pathname === '/' || pathname === '') {
    const target = '/index.html' + parsedUrl.search + parsedUrl.hash;
    res.writeHead(302, { Location: target });
    return res.end();
  }

  const filePath = path.join(__dirname, pathname);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Extension-agnostic resolution for images in assets/images/
      if (pathname.includes('/assets/images/')) {
        const imagesDir = path.join(__dirname, 'assets', 'images');
        const parsed = path.parse(pathname);
        const requestedBase = parsed.name.toLowerCase();
        if (fs.existsSync(imagesDir)) {
          const files = fs.readdirSync(imagesDir);
          const match = files.find(f => path.parse(f).name.toLowerCase() === requestedBase);
          if (match) {
            const fallbackPath = path.join(imagesDir, match);
            const fallbackExt = path.extname(match);
            const fallbackType = MIME_TYPES[fallbackExt] || 'image/jpeg';
            try {
              const fallbackData = fs.readFileSync(fallbackPath);
              res.writeHead(200, { 'Content-Type': fallbackType });
              return res.end(fallbackData);
            } catch (readErr) {
              // continue to 404
            }
          }
        }
      }

      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${pathname}`);
      return;
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`✨ Wedding Website running at http://localhost:${PORT}`);
  console.log(`👉 http://localhost:${PORT} redirects to http://localhost:${PORT}/index.html`);
});
