'use strict';

const http = require('http');

const server = http
  .createServer((req, res) => {
    let part = 0;

    setImmediate(() => {
      part++;

      console.log(`part=${part}`);
    });

    console.log('Hello from server!');
  })
  .listen(3000);
