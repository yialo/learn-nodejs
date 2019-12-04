'use strict';

const http = require('http');
const fs = require('fs');

const chat = require('./chat');

const sendFile = (fileName, res) => {
  const fileStream = fs.createReadStream(fileName);

  fileStream.on('error', () => {
    res.statusCode = 500;
    res.end('Server error');
  })
    .pipe();
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      sendFile('index.html', res);
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
