'use strict';

module.exports.checkAuthMiddleware = (req, res, next) => {
  if (!req.session.user) {
    const error = new Error('Вы не авторизованы');
    error.status = 401;

    if (req.baseUrl === '/chat') {
      return res.render('chat', { error });
    }

    return next(error);
  }

  next();
};
