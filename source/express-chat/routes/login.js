const express = require('express');
const loginRouter = express.Router();

loginRouter.get('/', (_, res) => {
  res.render('login');
});

module.exports.loginRouter = loginRouter;
