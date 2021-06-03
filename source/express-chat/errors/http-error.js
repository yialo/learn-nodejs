'use strict';

const http = require('http');
const path = require('path');
const util = require('util');

class HttpError extends Error {
  constructor(status, message) {
    super();
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message ?? http.STATUS_CODES[status] ?? 'HttpError';
  }
}

module.exports.HttpError = HttpError;
