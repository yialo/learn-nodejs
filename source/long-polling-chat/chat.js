'use strict';

let clients = [];

module.exports = {
  subscribe(req, res) {
    clients.push(res);
  },

  publish(message) {
    clients.forEach((res) => {
      res.end(message);
    })

    clients = [];
  }
};
