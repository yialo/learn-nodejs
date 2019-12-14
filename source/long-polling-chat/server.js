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
    case '/style.css':
      sendFile('public/style.css', res);
      break;
    case '/script.js':
      sendFile('public/script.js', res);
      break;
    case '/subscribe':
      chat.subscribe(req, res);
      break;
    case '/publish': {
      let content = '';

      req
        .on('readable', () => {
          const tmp = req.read();

          if (tmp !== null) {
            content += tmp;
          }
        })
        .on('end', () => {
          const body = JSON.parse(content);
          chat.publish(body.message);
          res.end('ok');
        });

      break;
    }
    default:
      res.statusCode = 404;
      res.end('Not found');
  }
});

server.listen(3000);
