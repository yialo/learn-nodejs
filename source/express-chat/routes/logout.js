'use strict';

const { Router } = require('express');

const logoutRouter = Router();

logoutRouter.use('/', (req, res) => {
  res.render('logout');
});

module.exports.logoutRouter = logoutRouter;
