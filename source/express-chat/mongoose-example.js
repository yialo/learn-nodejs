'use strict';

const { connect, Schema, model } = require('mongoose');

connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const catSchema = Schema({ name: String });
catSchema.methods.meow = function () {
  console.log('meow', this.get('name'));
};

const Cat = model('Cat', catSchema);

const kitty = new Cat({ name: 'Zildjian' });

kitty.save().then((target) => {
  target.meow();
});
