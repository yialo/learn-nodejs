'use strict';

const EventEmitter = require('events').EventEmitter;

const server = new EventEmitter();

server.on('error', (err) => {
  console.log(err.message)
});

server.emit('error', new ReferenceError('Ошибка обращения'));
