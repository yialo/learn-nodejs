'use strict';

const fs = require('fs');
const path = require('path');

const targetFilePath = path.resolve(__dirname, 'ref.js');

fs.open(targetFilePath, 'r', (err, file) => {
  setImmediate(() => {
    console.log('Immediate!');
  });

  console.log('I/O!');

  process.nextTick(() => {
    console.log('Next tick!');

    process.nextTick(() => {
      console.log('Another tick!');
    });
  });
});

console.log('Synchronous code executes...');
