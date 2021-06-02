'use strict';

const path = require('path');

const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session')
const createError = require('http-errors');
const multer = require('multer');
const logger = require('morgan');

const { config } = require('./config');
const { ENV } = require('./constants');
const { AuthError } = require('./error/auth-error');
const { HttpError } = require('./error/http-error');
const { renderHttpErrorMiddleware } = require('./middleware/render-http-error');

const { chatRouter } = require('./routes/chat');
const { indexRouter } = require('./routes/index');
const { loginRouter } = require('./routes/login');
const { usersRouter } = require('./routes/users');

const app = express();

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());

const upload = multer();
app.use(upload.array());

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

app.use(renderHttpErrorMiddleware);

app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let error = err;

  if (typeof err === 'number') {
    error = new HttpError(err);
  }

  if (error instanceof HttpError) {
    return res.renderHttpError(error);
  }

  if (error instanceof AuthError) {
    res.status(error.status);
    return res.send(error);
  }

  if (!error.status) {
    error.status = 500;
  }

  res.status(error.status);

  const locals = {
    error: req.app.get('env') === ENV.DEVELOPMENT ? error : {},
  };

  res.render('error', locals);
});

app.use((req, res) => {
  if (req.session.numberOfVisits === undefined) {
    req.session.numberOfVisits = 1;
  } else {
    req.session.numberOfVisits += 1;
  }
});

module.exports = { app };
