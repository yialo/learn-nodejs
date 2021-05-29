'use strict';

const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (_, res) => {
  res.render('index');
});

module.exports.indexRouter = indexRouter;
