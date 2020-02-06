const utils = require('../../utils');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: context => {
      if(context.data && context.params.user_id == null) {
        context.data.userId = context.params.userId;
      }
    },
    update: utils.mapUserIdToData,
    patch: utils.mapUserIdToData,
    remove: []
  },

  after: {
    all: [],
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
