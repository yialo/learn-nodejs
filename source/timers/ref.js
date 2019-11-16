'use strict';

const http = require('http');

const server = http
  .createServer((req, res) => {
    console.log('Hello from server!');
  })
  .listen(3000);

setTimeout(() => {
  server.close();
}, 2500);

const timer = setInterval(() => {
  console.log(process.memoryUsage());
}, 1000);

timer.unref();
