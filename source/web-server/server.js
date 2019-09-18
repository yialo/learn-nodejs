'use strict';

const http = require('http');
const debug = require('debug')('server');

const HOST = '127.0.0.1';
const PORT = 1337;

const server = http.createServer();

server.on('request', require('./request'));

server.listen(PORT, HOST);

debug('Server is running');
