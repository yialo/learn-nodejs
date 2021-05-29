const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (_, res) => {
  res.render('index');
});

module.exports.indexRouter = indexRouter;
