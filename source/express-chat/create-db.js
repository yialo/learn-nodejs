'use strict';

const mongoose = require('./libs/mongoose');
const { User } = require('./models/user');

const open = (callback) => {
  mongoose.connection.on('open', callback);
};

const dropDatabase = async () => {};

const createUsers = async () => {};

const close = async () => {};

open(async (openingError) => {
  if (openingError) {
    throw openingError;
  }

  try {
    await mongoose.connection.dropDatabase();
    console.log('Stale database deleted');

    const bob = new User({ username: 'Bob', password: '123' });
    const bull = new User({ username: 'Bull', password: '456' });
    const admin = new User({ username: 'admin', password: 'cool' });

    Promise.all([
      bob.save(),
      bull.save(),
      admin.save(),
    ]).then(
      (results) => {
        console.log(`Saved users: ${results}`);
        mongoose.disconnect().then(() => {
          console.log('Disconnected');
        });
      },
      (savingError) => {
        throw savingError;
      }
    );
  } catch (error) {
    throw error;
  }
});
