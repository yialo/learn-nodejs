'use strict';

class AuthError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, AuthError);
    this.message = message ?? 'AuthError';
  }
}

module.exports.AuthError = AuthError;
