'use strict';

const url = require('url');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = (request, response) => {
  const parsedUrl = url.parse(request.url, true);

  logger.info('Got request', request.method, request.url);

  if (
    request.method = 'GET'
    && parsedUrl.pathname === '/echo'
    && parsedUrl.query.message
  ) {
    const { message } = parsedUrl.query;

    logger.debug(`Echo: ${message}`);

    response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.statusCode = 200;
    response.end(message);
  } else {
    logger.error('Unknown URL');

    response.statusCode = 404;
    response.end('Page not found');
  }
};
