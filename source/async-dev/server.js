'use strict';

const fs = require('fs');
const http = require('http');

const HOST = '127.0.0.1';
const PORT = 3000;

const server = http.createServer();

const makeRequest = (request, response) => {
  let info;

  if (request.url === '/') {
    info = fs.readFileSync('index.html');
    response.end(info);
  } else if (request.url === '/now') {
    response.end(new Date().toString());
  }
};

server.on('request', makeRequest);
server.listen(PORT, HOST);
