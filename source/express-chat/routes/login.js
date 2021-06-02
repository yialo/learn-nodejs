'use strict';

const { Router } = require('express');

const { AuthError } = require('../errors/auth-error');
const { User } = require('../models/user');

const loginRouter = Router();

loginRouter.get('/', (_, res) => {
  res.render('login');
});

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.authorize(username, password);

    req.session.user = user._id;
    res.send({});
  } catch (error) {
    if (error instanceof AuthError) {
      error.status = 403;
    }

    next(error);
  }
});

module.exports.loginRouter = loginRouter;
