'use strict';

const http = require('http');

const HOST = '127.0.0.1';
const PORT = 1337;

const server = http.createServer();

server.listen(PORT, HOST);

const { emit } = server;
server.emit = (...args) => {
  const [evt] = args;
  console.log(evt);
  emit.apply(server, args);
};

let counter = 0;
server.on('request', (request, response) => {
  counter += 1;
  response.end(`Hello world! Counter: ${counter}`);
});
