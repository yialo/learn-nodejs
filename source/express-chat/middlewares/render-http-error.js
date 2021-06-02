'use strict';

module.exports.renderHttpErrorMiddleware = (req, res, next) => {
  res.renderHttpError = (error) => {
    res.status(error.status);
    res.render('error', { error });
  };

  next();
};
