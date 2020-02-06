const camelcaseKeys = require('camelcase-keys');

module.exports = function (data, connection, hook) { // eslint-disable-line no-unused-vars
  return camelcaseKeys(data, {deep: true});
};
