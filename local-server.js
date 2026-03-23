const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = 3000;
const baseDir = __dirname;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wav": "audio/wav"
};

function getFilePath(urlPath) {
  const requestedPath = decodeURIComponent((urlPath || "/").split("?")[0]);
  const normalizedPath = requestedPath === "/" ? "index.html" : requestedPath.replace(/^\/+/, "");
  return path.join(baseDir, normalizedPath);
}

const server = http.createServer((req, res) => {
  const filePath = getFilePath(req.url);

  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    const resolvedPath = !statError && stats.isDirectory() ? path.join(filePath, "index.html") : filePath;

    fs.readFile(resolvedPath, (readError, data) => {
      if (readError) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      const extension = path.extname(resolvedPath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": mimeTypes[extension] || "application/octet-stream"
      });
      res.end(data);
    });
  });
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
