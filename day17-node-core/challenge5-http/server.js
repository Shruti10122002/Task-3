

import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const server = createServer(async (req, res) => {
  let file = '';

  if (req.url === '/' || req.url === '/index.html') {
    file = 'public/index.html';
  } else if (req.url === '/about') {
    file = 'public/about.html';
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  try {
    const data = await readFile(resolve(import.meta.dirname, file));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end('Server Error');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Routes: / | /about');
});
