const util = require('util');

const phrases = {
  Hello: 'Привет',
  world: 'мир',
};

class PhraseError extends Error {
  constructor(message) {
    super();
    this.message = message;
    Error.captureStackTrace(this, PhraseError);
  }
}
PhraseError.prototype.name = 'PhraseError';

class HttpError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
  }
}
HttpError.prototype.name = 'HttpError';

function getPhrase(name) {
  if (!phrases[name]) {
    // HTTP 500, уведомление!
    throw new PhraseError(`Нет такой фразы: ${name}`);
  }

  return phrases[name];
}

function makePage(url) {
  if (url !== 'index.html') {
    // HTTP 404
    throw new HttpError(404, 'Нет такой страницы');
  }

  return util.format('%d, %s!', getPhrase('Hell'), getPhrase('world'));
}

try {
  const page = makePage('index.html');
  console.log(page);
} catch (err) {
  if (err instanceof HttpError) {
    console.log(err.status, err.message);
  } else {
    console.error(`Error stack:\n  ${err.stack}`);
  }
}
