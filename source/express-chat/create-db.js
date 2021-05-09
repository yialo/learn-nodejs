'use strict';

const mongoose = require('./libs/mongoose');
const { User } = require('./models/user');

const open = (callback) => {
  mongoose.connection.on('open', callback);
};

const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log('Stale database deleted');
  } catch (dbDroppingError) {
    throw dbDroppingError;
  }
};

const createUsers = async () => {
  const bob = new User({ username: 'Bob', password: '123' });
  const bull = new User({ username: 'Bull', password: '456' });
  const admin = new User({ username: 'admin', password: 'cool' });

  return new Promise((resolve, reject) => {
    Promise.all([
      bob.save(),
      bull.save(),
      admin.save(),
    ]).then(
      (results) => {
        console.log(`Saved users: ${results}`);
        resolve(results);
      },
      (savingError) => {
        reject(savingError);
      }
    );
  });
};

const close = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (closingError) {
    throw closingError;
  }
};

open(async (openingError) => {
  if (openingError) {
    throw openingError;
  }

  await dropDatabase();
  await createUsers();
  await close();
});
