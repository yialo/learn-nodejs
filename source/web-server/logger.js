'use strict';

const { createLogger, format, transports } = require('winston');

const consoleTransport = new transports.Console({
  format: format.prettyPrint({ colorize: true }),
});
const fileTransport = new transports.File({
  filename: 'debug.log',
});

const makeLogger = (filepath) => {
  let logger;

  if (filepath.match(/request.js$/)) {
    logger = createLogger({
      level: 'info',
      transports: [
        consoleTransport,
        fileTransport,
      ],
    });
  } else {
    logger = createLogger({
      level: 'debug',
      transports: [consoleTransport],
    });
  }

  return logger;
};

module.exports = (targetModule) => makeLogger(targetModule.filename);
