'use strict';

const { User } = require('../models/user');

module.exports.loadUserMiddleware = async (req, res, next) => {
  let user = null;

  req.user = user;
  res.locals.user = user;

  if (!req.session.user) {
    return next();
  }

  try {
    user = await User.findById(req.session.user);

    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
