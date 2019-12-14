'use strict';

let clients = [];

module.exports = {
  subscribe(req, res) {
    clients.push(res);

    res.on('close', () => {
      clients.splice(clients.indexOf(res), 1);
    });
  },

  publish(message) {
    clients.forEach((res) => {
      res.end(message);
    })

    clients = [];
  }
};
