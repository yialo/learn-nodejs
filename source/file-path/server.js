'use strict';

const fs = require('fs');
const http = require('http');
const mime = require('mime');
const path = require('path');
const url = require('url');

const ROOT = path.join(__dirname, '/public');

const checkAccess = (req) => {
  const address = url.parse(req.url, true);

  return (address.query.secret === 'hello');
};

const makeRequestFeedback = (res, code) => {
  res.statusCode = code;

  switch (code) {
    case 400:
      res.end('Bad request');
      break;
    case 404:
      res.end('File not found');
      break;
    default:
      return;
  }
};

const sendFile = (filePath, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      throw err;
    }

    const mimeType = mime.getType(filePath);
    res.setHeader('Content-Type', `${mimeType}; charset=utf-8`);
    res.end(content);
  });
};

const sendFileSafe = (filePath, res) => {
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(filePath);
  } catch (err) {
    makeRequestFeedback(res, 400);
    return;
  }

  if (~decodedPath.indexOf('\0')) {
    makeRequestFeedback(res, 400);
    return;
  }

  decodedPath = path.normalize(path.join(ROOT, decodedPath));

  if (decodedPath.indexOf(ROOT) !== 0) {
    makeRequestFeedback(res, 404);
    return;
  }

  fs.stat(decodedPath, (err, stats) => {
    if (err || !stats.isFile()) {
      makeRequestFeedback(res, 404);
      return;
    }

    sendFile(decodedPath, res);
  })
};

const server = http.createServer((req, res) => {
  if (!checkAccess(req)) {
    res.statusCode = 403;
    res.end('Tell me the secret to access!');
    return;
  }

  const address = url.parse(req.url);

  sendFileSafe(address.pathname, res);
});

server.listen(3000);
