'use strict';

const http = require('http');
const url = require('url');

const HOST = '127.0.0.1';
const PORT = 1337;

const server = http.createServer((request, response) => {
  console.log(request.headers);

  const parsedUrl = url.parse(request.url, true);

  if (parsedUrl.pathname === '/echo' && parsedUrl.query.message) {
    response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.statusCode = 200;
    response.end(parsedUrl.query.message);
  } else {
    response.statusCode = 404;
    response.end('Page not found');
  }
});

server.listen(PORT, HOST);
