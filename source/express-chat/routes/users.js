'use strict';

const { Router } = require('express');
const { ObjectID } = require('mongodb');

const { HttpError } = require('../errors/http-error');
const { User } = require('../models/user');

const usersRouter = Router();

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

const createNotFoundError = () => new HttpError(404, 'User not found');

usersRouter.get('/:id', async (req, res, next) => {
  let userId;

  try {
    userId = new ObjectID(req.params.id);
  } catch {
    return next(createNotFoundError());
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createNotFoundError());
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports.usersRouter = usersRouter;
