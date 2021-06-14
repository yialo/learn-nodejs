'use strict';

const { ENV } = require('../constants');
const { AuthError } = require('../errors/auth-error');
const { HttpError } = require('../errors/http-error');

module.exports.handleErrorMiddleware = (err, req, res, next) => {
  console.log('--- inside: handleErrorMiddleware', err);

  if (res.headersSent) {
    return next(err);
  }

  let error = err;

  if (typeof err === 'number') {
    error = new HttpError(err);
  }

  if (error instanceof HttpError) {
    return res.renderHttpError(error);
  }

  if (error instanceof AuthError) {
    res.status(error.status);
    return res.send(error);
  }

  if (!error.status) {
    error.status = 500;
  }

  res.status(error.status);

  const locals = {
    error: req.app.get('env') === ENV.DEVELOPMENT ? error : {},
  };

  res.render('error', locals);
};
