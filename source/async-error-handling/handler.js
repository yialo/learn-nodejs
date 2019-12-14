'use strict';

const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const ROUTE_MAP = {
  '/': 'public/index.html',
  '/bad': 'no-such-file',
};

module.exports = async (req, res) => {
  const filePath = ROUTE_MAP[req.url];

  if (filePath) {
    try {
      const content = await readFile(filePath);
      res.end(content);
    } catch (err) {
      throw err;
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
};
