const phrases = require('./locale.json');

module.exports = class User {
  constructor(name) {
    this.name = name;
  }

  hello(who) {
    console.log(
      `${phrases.hello}, ${who.name}`
        .replace(/^[а-я]/, (matched) => matched.toUpperCase())
    );
  }
};
