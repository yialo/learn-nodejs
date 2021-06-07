'use strict';

const socketIo = require('socket.io');

module.exports.createChatIo = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('message', (messageText) => {
      socket.emit('message', messageText);
    });
  });

  return io;
};
