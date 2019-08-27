class User {
  constructor(name) {
    this.name = name;
  }

  hello(who) {
    console.log(`Привет, ${who.name}`);
  }
}

const bob = new User('Боб');
const fedya = new User('Федя');

bob.hello(fedya);
