'use strict';

process.env.DEBUG = '*';

const createLogger = require('debug');

const PROJECT_NAME = 'express-chat';

const getLogger = (targetModule) => {
  const filePath = targetModule.filename;

  const eraseFrom = filePath.indexOf(PROJECT_NAME);
  const displayPath = filePath.slice(eraseFrom + PROJECT_NAME.length + 1);

  return createLogger(`[${displayPath}]`)
};

module.exports.getLogger = getLogger;
