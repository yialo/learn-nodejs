'use strict';

const { User } = require('../models/user');

module.exports.loadUserMiddleware = async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  try {
    const user = await User.findById(req.session.user);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
