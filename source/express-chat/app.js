'use strict';

const path = require('path');

const cookieParser = require('cookie-parser');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

/**
 * Middlewares
 */

app.use((req, res, next) => {
  if (req.url === '/') {
    res.end('Home page');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.url === '/error') {
    throw new Error('Boo!');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.url === '/break') {
    next(new Error('Permission denied'));
  } else {
    next();
  }
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.status(err.status ?? 500);

  // render the error page
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.render('error', locals);

  res.end('Internal error');
});

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
 */

module.exports = { app };
