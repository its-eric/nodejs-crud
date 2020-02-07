const camelcaseKeys = require('camelcase-keys');

module.exports = function () {
  return function(context) {
    context.data = camelcaseKeys(context.data, { deep: true });
    return context;
  };
};