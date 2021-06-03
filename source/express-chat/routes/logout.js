'use strict';

const { Router } = require('express');

const logoutRouter = Router();

logoutRouter.post('/', async (req, res) => {
  req.session.destroy();
  res.render('index');
});

module.exports.logoutRouter = logoutRouter;
