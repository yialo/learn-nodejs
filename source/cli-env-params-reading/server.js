'use strict';

const { argv } = require('yargs');
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('The server is running!');
});

server.listen(argv.port);
