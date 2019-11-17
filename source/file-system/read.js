'use strict';

const fs = require('fs');

fs.readFile(__filename, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
