'use strict';

const { Router } = require('express');

const { checkAuthMiddleware } = require('../middlewares/check-auth');

const chatRouter = Router();

chatRouter.use('/', checkAuthMiddleware, (_, res) => {
  res.render('chat');
});

module.exports.chatRouter = chatRouter;
