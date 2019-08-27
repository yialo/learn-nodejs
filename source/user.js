module.exports = class User {
  constructor(name) {
    this.name = name;
  }

  hello(who) {
    console.log(`Привет, ${who.name}`);
  }
};
