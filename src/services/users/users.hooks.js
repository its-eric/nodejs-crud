const camelcaseKeys = require('camelcase-keys');
const snakecaseKeys = require('snakecase-keys');

module.exports = {
  before: {
    all: [
      context => {
        context.data = camelcaseKeys(context.data, {deep: true});
        return context;
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      context => {
        context.result = snakecaseKeys(context.result, {deep: true});
        return context;
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
