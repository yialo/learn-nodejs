const { getDict } = require('db');
const log = require('../logger')(module);

module.exports = class User {
  constructor(name) {
    this.name = name;
  }

  hello(who) {
    log(
      `${getDict('hello')}, ${who.name}`
        .replace(/^[а-я]/, (matched) => matched.toUpperCase())
    );
  }
};
