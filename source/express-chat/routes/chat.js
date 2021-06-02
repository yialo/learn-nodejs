'use strict';

const { Router } = require('express');

const chatRouter = Router();

chatRouter.use('/', (req, res) => {
  res.render('chat', { user: req.user });
});

module.exports.chatRouter = chatRouter;
