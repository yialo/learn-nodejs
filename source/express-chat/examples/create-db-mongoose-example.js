'use strict';

const { mongoose } = require('./libs/mongoose');

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

const requireModels = () => {
  require('./models/user');
};

const createUsers = (userConfigs = []) => {
  const userSavingPromises = userConfigs.map((config) => {
    const { User } = mongoose.models;
    const user = new User(config);
    return user.save();
  });

  return new Promise((resolve, reject) => {
    Promise.all(userSavingPromises).then(
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

const userConfigs = [
  { username: 'Bob', password: '123' },
  { username: 'Bull', password: '456' },
  { username: 'admin', password: 'cool' },
];

open(async (openingError) => {
  if (openingError) {
    throw openingError;
  }

  try {
    await dropDatabase();
    requireModels();
    await createUsers(userConfigs);
  } finally {
    close();
  }
});
