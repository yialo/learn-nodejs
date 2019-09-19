'use strict';

const http = require('http');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console(),
  ],
});

const HOST = '127.0.0.1';
const PORT = 1337;

const server = http.createServer();

server.on('request', require('./request'));

server.listen(PORT, HOST);

logger.info('Server is running');
