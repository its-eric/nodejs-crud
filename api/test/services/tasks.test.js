const assert = require('assert');
const app = require('../../src/app');

describe('\'tasks\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/users/:userId/tasks');
    assert.ok(service, 'Registered the service');
  });
});
