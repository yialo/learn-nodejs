'use strict';

const socketIo = require('socket.io');

module.exports.createChatIo = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('message', (messageText, done) => {
      socket.broadcast.emit('message', messageText);

      if (typeof done === 'function') {
        done();
      }
    });
  });

  return io;
};
