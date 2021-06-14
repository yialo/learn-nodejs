'use strict';

const session = require('express-session');

const { config } = require('../config');
const { sessionStore } = require('../libs/session-store');

module.exports.sessionMiddleware = session({
  cookie: config.session.cookie,
  resave: false,
  saveUninitialized: true,
  secret: config.session.secret,
  store: sessionStore,
});
