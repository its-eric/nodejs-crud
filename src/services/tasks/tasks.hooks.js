const utils = require('../../utils');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: utils.mapUserIdToData,
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
