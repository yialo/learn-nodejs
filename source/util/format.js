const util = require('util');

const str = util.format('My %s %d %j', 'string', 123, { test: 'obj' });
console.log(str);
