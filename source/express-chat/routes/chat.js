'use strict';

const { Router } = require('express');

const chatRouter = Router();

chatRouter.use('/', (_, res) => {
  res.render('chat');
});

module.exports.chatRouter = chatRouter;
