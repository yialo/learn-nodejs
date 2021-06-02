'use strict';

const crypto = require('crypto');

const { AuthError } = require('../errors/auth-error');
const { mongoose } = require('../libs/mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

schema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = String(Math.random());
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

schema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = async (username, password) => {
  const { User } = this;

  const user = await User.findOne({ username });

  if (user) {
    if (user.checkPassword(password)) {
      return user;
    } else {
      throw new AuthError('неверный пароль');
    }
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    return newUser;
  }
};

module.exports.User = mongoose.model('User', schema);
