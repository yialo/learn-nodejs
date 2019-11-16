'use strict';

const fs = require('fs');
const http = require('http');

const HOST = '127.0.0.1';
const PORT = 3000;

const server = http.createServer();

const makeRequest = (request, response) => {
  let info;

  if (request.url === '/') {
    fs.readFile('index.html', (err, info) => {
      if (err) {
        console.error(err);

        response.statusCode = 500;
        response.end('Internal server error occurs');

        return;
      }

      response.end(info);
    });
  } else {
    console.warn('Unknown URL');

    response.statusCode = 404;
    response.end('Page not found');
  }
};

server.on('request', makeRequest);
server.listen(PORT, HOST);
