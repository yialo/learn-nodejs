'use strict';

const { ENV } = require('../constants');

process.env.NODE_ENV = ENV.DEVELOPMENT;

module.exports.config = require('./config');
