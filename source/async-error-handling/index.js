'use strict';

const init = require('./server');

init()
  .catch((err) => {
    console.log(`Unexpected error catched: ${err}`);
  });
