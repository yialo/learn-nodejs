'use strict';

const path = require('path');

const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session')
const createError = require('http-errors');
const logger = require('morgan');

const { config } = require('./config');
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

app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: config.session.cookie,
  store: MongoStore.create({
    mongoUrl: config.mongoose.uri,
  }),
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(sendHttpErrorMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((err, req, res) => {
  let error = err;

  if (typeof err === 'number') {
    error = new HttpError(err);
  }

  if (error instanceof HttpError) {
    res.sendHttpError(error);
  } else {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status);

    const locals = {
      error: req.app.get('env') === ENV.DEVELOPMENT ? error : {},
    };

    res.render('error', locals);
  }
});

app.use((req, res) => {
  if (req.session.numberOfVisits === undefined) {
    req.session.numberOfVisits = 1;
  } else {
    req.session.numberOfVisits += 1;
  }
});

app.use((req, res, next) => {
  next(createError(404));
});

module.exports = { app };
