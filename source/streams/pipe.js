'use strict';

const http = require('http');
const fs = require('fs');

const PATH = 'react-logo.png';

const streamlessServer = http.createServer((req, res) => {
  if (req.url === `/${PATH}`) {
    fs.readFile(PATH, (err, content) => {
      if (err) {
        res.statusCode = 500;
        res.end('Server error');
        console.error(err);
      } else {
        res.setHeader('Content-Type', 'image/png');
        res.end(content);
      }
    })
  } else {
    res.statusCode = 404;
    res.end('File not found');
  }
});

const sendFile = (file, res) => {
  const write = () => {
    const fileContent = file.read();

    if (fileContent && !res.write(fileContent)) {
      file.removeListener('readable', write);

      res.once('drain', () => {
        file.on('readable', write);
        write();
      });
    }

    file.on('end', () => {
      res.end();
    })
  };

  file.on('readable', write);
};

const sendFileWithPipe = (file, res) => {
  file.pipe(res);

  file.on('error', (err) => {
    res.statusCode = 500;
    res.end('Server error');
    console.error(err);
  });

  res.on('close', () => {
    file.destroy();
  });
};

const streamyServer = http.createServer((req, res) => {
  if (req.url === `/${PATH}`) {
    const file = new fs.ReadStream(PATH);
    sendFileWithPipe(file, res);
  } else {
    res.statusCode = 404;
    res.end('File not found');
  }
});

streamyServer.listen(3000);
