// Initializes the `tasks` service on path `/users/:userId/tasks`
const createService = require('feathers-sequelize');
const createModel = require('../../models/tasks.model');
const hooks = require('./tasks.hooks');
const filters = require('./tasks.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tasks',
    Model,
    paginate,
    multi: process.env.NODE_ENV === 'testing'
  };

  // Initialize our service with any options it requires
  app.use('api/users/:userId/tasks', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/users/:userId/tasks');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
