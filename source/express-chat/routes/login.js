'use strict';

const { Router } = require('express');
const loginRouter = Router();

loginRouter.get('/', (_, res) => {
  res.render('login');
});

loginRouter.post('/', (req, res, next) => {
  console.log(req.body);

  const { username, password } = req.body;

  res.send('READY');
});

module.exports.loginRouter = loginRouter;
