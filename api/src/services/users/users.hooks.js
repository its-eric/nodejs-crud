const camelcaseData = require('../../hooks/camelcase-data');
const snakecaseResult = require('../../hooks/snakecase-result');

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [ camelcaseData() ],
    update: [ camelcaseData() ],
    patch: [ camelcaseData() ],
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
