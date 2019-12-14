// Usage of util.inherits() is discouraged.
// Please use the ES6 class and extends keywords to get language level inheritance support.
// Also note that the two styles are semantically incompatible.

const util = require('util');

function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function () {
  console.log(`Ходит ${this.name}`);
}

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function () {
  console.log(`Прыгает ${this.name}`);
}

util.inherits(Rabbit, Animal);

const rabbit = new Rabbit('Наш кролик');
rabbit.walk();
rabbit.jump();
