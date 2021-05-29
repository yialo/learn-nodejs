'use strict';

const { Router } = require('express');
const loginRouter = Router();

loginRouter.get('/', (_, res) => {
  res.render('login');
});

module.exports.loginRouter = loginRouter;
