'use strict';

const MongoStore = require('connect-mongo');

const { config } = require('../config');

module.exports.sessionStore = MongoStore.create({
  mongoUrl: config.mongoose.uri,
});
