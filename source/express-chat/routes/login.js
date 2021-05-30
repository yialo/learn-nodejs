'use strict';

const { Router } = require('express');

const { User } = require('../models/user');

const loginRouter = Router();

loginRouter.get('/', (_, res) => {
  res.render('login');
});

loginRouter.post('/', async (req, res, next) => {
  console.log('--- req.params', req.params);
  console.log('--- req.body', req.body);
  console.log('--- req.query', req.query);

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      if (user.checkPassword(password)) {
        // 200 ok
      } else {
        // 403 forbidden
      }
    } else {
      const newUser = new User({ username, password });

      try {
        await newUser.save();
      } catch (saveError) {
        return next(saveError);
      }
    }
  } catch (findError) {
    next(findError);
  }
});

module.exports.loginRouter = loginRouter;
