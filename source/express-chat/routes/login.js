'use strict';

const { Router } = require('express');

const { HttpError } = require('../error');
const { User } = require('../models/user');

const loginRouter = Router();

loginRouter.get('/', (_, res) => {
  res.render('login');
});

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  User.authorize(username, password)
    .then((user) => {
      req.session.user = user._id;
      res.send({});
    })
    .catch((error) => {
      next(error);
    })
});

module.exports.loginRouter = loginRouter;
