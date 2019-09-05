'use strict';

const http = require('http');

const HOST = '127.0.0.1';
const PORT = 1337;

const server = new http.Server();

server.listen(PORT, HOST);

server.on('request', (request, response) => {
  response.end('Hello world');
});
