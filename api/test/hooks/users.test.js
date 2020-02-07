const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const camelcaseData = require('../../src/hooks/camelcase-data');

describe('\'camelcase-data\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();
    app.use('api/users', memory());

    app.service('api/users').hooks({
      before: {
        create: camelcaseData()
      }
    });
  });

  it('saves the user as expected', async () => {
    const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
    const params = { user };

    const newUser = await app.service('api/users').create(user, params);

    assert.equal(newUser.username, 'jsmith');
    assert.equal(newUser.firstName, 'John');
    assert.equal(newUser.lastName, 'Smith');
  });
});