'use strict';

const logAsJson = (object, label) => {
  console.log(label, JSON.stringify(object, null, 2));
};

module.exports.logAsJson = logAsJson;
