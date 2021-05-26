'use strict';

const path = require('path');

const cookieParser = require('cookie-parser');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const pug = require('pug');

const { ENV } = require('./constants');
const { HttpError } = require('./error');
const { sendHttpErrorMiddleware } = require('./middleware/send-http-error');
const { indexRouter } = require('./routes/index');
const { usersRouter } = require('./routes/users');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sendHttpErrorMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  let error = err;

  if (typeof err === 'number') {
    error = new HttpError(err);
  }

  if (error instanceof HttpError) {
    res.sendHttpError(error);
  } else {
    res.status(error.status ?? 500);

    const locals = {
      error: req.app.get('env') === ENV.DEVELOPMENT ? error : {},
    };

    res.render('error', locals);
  }
});

module.exports = { app };
