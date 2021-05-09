'use strict';

const mongoose = require('./libs/mongoose');
const { User } = require('./models/user');

mongoose.connection.on('open', () => {
  const { db } = mongoose.connection;

  db.dropDatabase((error) => {
    if (error) {
      throw error;
    }

    console.log('Stale database deleted');
    mongoose.disconnect();
  });
});
