'use strict';

process.env.DEBUG = '*';

const log = require('debug')('[express-chat:server]');

module.exports.log = log;
