'use strict';

const { promisify } = require('util');

const { parse } = require('cookie');
const { signedCookie } = require('cookie-parser');
const { Server } = require('socket.io');

const { config } = require('./config');
const { HttpError } = require('./errors/http-error');
const { sessionStore } = require('./libs/session-store');
const { User } = require('./models/user');

const getSessionById = promisify(sessionStore.get).bind(sessionStore);

module.exports.createChatSocket = (httpServer) => {
  const io = new Server();

  io.on('connection', async (socket) => {
    socket.handshake.cookies = parse(socket.handshake.headers.cookie) ?? {};
    const sid = signedCookie(socket.handshake.cookies['connect.sid'], config.session.secret);

    sessionIdKeeper.add(sid);

    console.log('--- connection to WS', sessionIdKeeper.sids);

    try {
      const session = await getSessionById(sid);

      if (!session) {
        throw new HttpError(401, 'No session');
      }

      if (!session.user) {
        console.log(`Session ${sid} is anonymous`);
      } else {
        const user = await User.findById(session.user);

        if (!user) {
          throw new HttpError(403, `User not found: ${session.user}`);
        }

        socket.handshake.user = user;
        socket.broadcast.emit('join', user.username);
      }

      socket.on('message', (messageText, done) => {
        console.log('--- adapter', io.sockets.adapter);

        const payload = {
          author: socket.handshake.user.username,
          text: messageText,
        };

        socket.broadcast.emit('message', payload);

        if (typeof done === 'function') {
          done();
        }
      });

      socket.on('disconnect', () => {
        if (socket.handshake.user?.username) {
          socket.broadcast.emit('leave', socket.handshake.user.username);
        } else {
          console.log('Cannot find user of his username');
        }
      });
    } catch (error) {
      const errorMessage = `Socket.io session error: ${
        error instanceof HttpError ? `status ${error.status}, ` : ''
      }${error.message}`;

      console.log(errorMessage);
    }
  });
};
