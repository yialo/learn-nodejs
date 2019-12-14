'use strict';

const EventEmitter = require('events').EventEmitter;

const db = new EventEmitter();
db.setMaxListeners(15);

class Request {
  constructor() {
    this.bigData = new Array(1e6).join('*');

    db.on('data', this.onData)
  }

  end() {
    db.removeListener('data', this.onData);
  }

  onData(info) {
    this.send(info);
  }

  onError() {
    this.send('Извините, у нас проблема...');
  }

  send(data) {
    console.log(data);
  }
}

setInterval(() => {
  const request = new Request();
  request.end();
  console.log(process.memoryUsage().heapUsed);
  console.log(db);
}, 200);
