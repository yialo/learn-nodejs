'use strict';

module.exports = async () => {
  const http = require('http');
  const handler = require('./handler');

  const server = http.createServer((req, res) => {
    handler(req, res)
      .catch((err) => {
        res.statusCode = 500;
        res.end('Internal server error');
      });
  });

  server.listen(3000);
};
