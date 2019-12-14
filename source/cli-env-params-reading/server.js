'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
  res.end('The server is running!');
});

server.listen(3000);
