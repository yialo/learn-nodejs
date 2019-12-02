'use strict';

const fs = require('fs');

const stream = new fs.ReadStream('react-logo.png');

stream.on('readable', () => {
  const data = stream.read();

  if (data !== null) {
    console.log(data);
    console.log(data.length);
  }
});

stream.on('end', () => {
  console.log('THE END');
});

stream.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.log('File not found');
  } else {
    console.error(err);
  }
});
