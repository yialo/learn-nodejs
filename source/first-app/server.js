const db = require('db')
db.connect();

const log = require('./logger')(module)
const User = require('./user');

function run() {
  const bob = new User('Боб');
  const fedya = new User('Федя');

  log(db.getDict('Run successful'));
  bob.hello(fedya);
}

if (module.parent) exports.run = run;
else run();
