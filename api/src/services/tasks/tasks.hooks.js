const mapUserIdToData = require('../../hooks/map-user-id-to-data');
const camelcaseData = require('../../hooks/camelcase-data');
const snakecaseResult = require('../../hooks/snakecase-result');

module.exports = {
  before: {
    all: [],
    find(context) {
      context.params.query.userId = context.params.userId;
    },
    get: [ mapUserIdToData() ],
    create: [
      camelcaseData(),
      mapUserIdToData()
    ],
    update: [
      camelcaseData(),
      mapUserIdToData()
    ],
    patch: [
      camelcaseData(),
      mapUserIdToData()
    ],
    remove: []
  },

  after: {
    all: [ snakecaseResult() ],
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
