'use strict';

const { EventEmitter } = require('events');

module.exports.SESSION_KEEPER_EVENTS = {
  RELOAD: 'session:reload',
};

module.exports.runtimeSessionKeeper = new EventEmitter();
