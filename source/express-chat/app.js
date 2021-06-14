'use strict';

const path = require('path');

const express = require('express');
const createError = require('http-errors');

const multer = require('multer');
const logger = require('morgan');

const { handleErrorMiddleware } = require('./middlewares/handle-error');
const { loadUserMiddleware } = require('./middlewares/load-user');
const { renderHttpErrorMiddleware } = require('./middlewares/render-http-error');
const { sessionMiddleware } = require('./middlewares/session');
const { chatRouter } = require('./routes/chat');
const { indexRouter } = require('./routes/index');
const { loginRouter } = require('./routes/login');
const { logoutRouter } = require('./routes/logout');
const { usersRouter } = require('./routes/users');

const app = express();

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());

const upload = multer();
app.use(upload.array());

app.use(express.urlencoded({ extended: false }));

app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

app.use(loadUserMiddleware);

app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', usersRouter);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use(renderHttpErrorMiddleware);
app.use(handleErrorMiddleware);

module.exports.app = app;
