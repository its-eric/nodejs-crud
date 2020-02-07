const snakecaseKeys = require('snakecase-keys');

module.exports = function () {
  return function(context) {
    context.result = snakecaseKeys(context.result, { deep: true });
    return context;
  };
};