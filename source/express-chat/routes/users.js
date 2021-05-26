const express = require('express');
const usersRouter = express.Router();

const { HttpError } = require('../error');
const { User } = require('../models/user');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      next(new HttpError(404, 'User not found'));
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports.usersRouter = usersRouter;
