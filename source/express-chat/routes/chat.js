'use strict';

const { Router } = require('express');

const { User } = require('../models/user')

const chatRouter = Router();

chatRouter.use('/', async (req, res) => {
  const user = await User.findById(req.session.user);

  res.render('chat', { user });
});

module.exports.chatRouter = chatRouter;
