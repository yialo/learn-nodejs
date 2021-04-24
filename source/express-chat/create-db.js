'use strict';

const { User } = require('./models/user');

const user = new User({
  username: 'Bob',
  password: 'secret',
});

user.save().then(() => {
  User.findOne({ username: 'Bob' }).then((found) => {
    console.log(found);
  })
});
