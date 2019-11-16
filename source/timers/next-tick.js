'use strict';

const http = require('http');

const server = http
  .createServer((req, res) => {
    process.nextTick(() => {
      req.on('readable', () => {
        console.log('Hello from timer!');
      })
    });

    console.log('Hello from server!');
  })
  .listen(3000);
