#!/usr/bin/env node

'use strict';

const { createServer } = require('http');

const { Server: IoServer } = require('socket.io');

const { app } = require('../app');
const { config } = require('../config');
const { getLogger } = require('../libs/get-logger');
const { createChatSocket } = require('../socket');

const log = getLogger(module);

/* Normalize a port into a number, string, or false. */

const normalizePort = (val) => {
  const port = Number.parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/* Event listener for HTTP server "error" event. */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  log(`Listening on ${bind}`);
};

const port = normalizePort(process.env.PORT ?? config.port);
app.set('port', port);

const server = createServer(app);
const io = new IoServer(server);

app.set('io', io);
createChatSocket(io);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
