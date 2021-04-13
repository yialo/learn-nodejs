'use strict';

const path = require('path');

const cookieParser = require('cookie-parser');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');

const { ENV } = require('./constants');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use((err, req, res, next) => {
  res.status(err.status ?? 500);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === ENV.DEVELOPMENT ? err : {};
  res.render('error', locals);

  res.end('Internal error');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

module.exports = { app };
