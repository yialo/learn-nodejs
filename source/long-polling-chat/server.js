'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const chat = require('./chat');

const sendFile = (fileName, res) => {
  const fileStream = fs.createReadStream(fileName);

  fileStream.on('error', () => {
    res.statusCode = 500;
    res.end('Server error');
  })
    .pipe(res);
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      sendFile('public/index.html', res);
      break;
    case '/subscribe':
      chat.subscribe(req, res);
      break;
    case '/publish':
      chat.publish()
      break;
    default:
      res.statusCode = 404;
      res.end('Not found');
  }
});

server.listen(3000);
