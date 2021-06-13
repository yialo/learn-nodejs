'use strict';

const { Router } = require('express');

const logoutRouter = Router();

logoutRouter.post('/', (req, res, next) => {
  const sid = req.session.id;

  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.render('index');
  });
});

module.exports.logoutRouter = logoutRouter;
