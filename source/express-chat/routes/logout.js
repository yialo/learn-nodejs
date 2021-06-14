'use strict';

const { Router } = require('express');

const { runtimeSessionKeeper, SESSION_KEEPER_EVENTS } = require('../libs/runtime-session-keeper');

const logoutRouter = Router();

logoutRouter.post('/', (req, res, next) => {
  const sid = req.session.id;

  req.session.destroy((error) => {
    runtimeSessionKeeper.emit(SESSION_KEEPER_EVENTS.RELOAD, sid);

    if (error) {
      return next(error);
    }

    res.render('index');
  });
});

module.exports.logoutRouter = logoutRouter;
