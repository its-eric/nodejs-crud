module.exports = function () {
  return function(context) {
    if(context.data && context.params.userId != null) {
      context.data.userId = context.params.userId;
    }
  };
};