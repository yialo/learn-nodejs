'use strict';

const mongoose = require('mongoose');

const { config: { mongoose: { uri, options } } } = require('../config');

mongoose.connect(uri, options);

module.exports.mongoose = mongoose;
