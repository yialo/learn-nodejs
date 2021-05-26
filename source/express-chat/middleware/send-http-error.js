'use strict';

module.exports.sendHttpErrorMiddleware = (req, res, next) => {
  res.sendHttpError = (error) => {
    res.status(error.status);
    res.render('error', { error });
  };

  next();
};
