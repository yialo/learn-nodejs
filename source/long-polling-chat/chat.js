'use strict';

let clients = [];

module.exports = {
  subscribe(req, res) {
    console.log('subscribe');

    clients.push(res);
  },

  publish(message) {
    console.log('publish \'%s\'', message);

    clients.forEach((res) => {
      res.end(message);
    })

    clients = [];
  }
};
