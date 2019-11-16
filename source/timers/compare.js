'use strict';

const fs = require('fs');

fs.open(__filename, 'r', (err, file) => {
  console.log('I/O!');
});

setImmediate(() => {
  console.log('Immediate!');
});

process.nextTick(() => {
  console.log('Next tick!');
});
