const assert = require('chai').assert;
const rp = require('request-promise');
const app = require('../src/app');

describe('Feathers application tests', () => {
  // We don't need to change this as long as we are dockerized.
  // Our tests should be invoked inside the container.
  const baseUrl = 'http://localhost:3031/';

  before(function(done) {
    this.server = app.listen(3031);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  describe('404', function() {
    it('shows a 404 HTML page', () => {
      return rp({
        url: baseUrl + 'path/to/nowhere',
        headers: {
          'Accept': 'text/html'
        }
      }).catch(res => {
        assert.equal(res.statusCode, 404);
        assert.ok(res.error.indexOf('<html>') !== -1);
      });
    });

    it('shows a 404 JSON error without stack trace', () => {
      return rp({
        url: baseUrl + 'path/to/nowhere',
        json: true
      }).catch(res => {
        assert.equal(res.statusCode, 404);
        assert.equal(res.error.code, 404);
        assert.equal(res.error.message, 'Page not found');
        assert.equal(res.error.name, 'NotFound');
      });
    });
  });

  describe('implementation tests', () => {
    const usersService = 'api/users/';
    const tasksService = 'api/users/:userId/tasks/';

    beforeEach(() =>
      // Sync to the database only when we're testing;
      // in dev or production we would like to have control
      // over our db state with migrations
      app.get('sequelizeClient').sync({ alter: true })
    );

    afterEach(() => {
      app.service(usersService).remove(null).catch(() => {});
      app.service(tasksService).remove(null).catch(() => {});
    });

    it('can POST one user', () => {
      let body = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
  
      return rp.post({ url: baseUrl + usersService, json: true, body })
        .then(res => {
          assert.include(res, body);
        });
    });

    it('can PATCH one user', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      const params = { user };
      const newUser = await app.service('api/users').create(user, params);

      let body = { first_name: 'John', last_name: 'Doe' };
      return rp.patch({ url: baseUrl + usersService + newUser.id, json: true, body })
        .then(res => {
          assert.include(res, body);
          assert.isNotNull(res.username);
        });
    });

    it('can GET one user', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      const params = { user };
      const newUser = await app.service('api/users').create(user, params);

      let body = { first_name: 'John', last_name: 'Doe' };
      return rp.patch({ url: baseUrl + usersService + newUser.id, json: true, body })
        .then(res => {
          assert.include(res, body);
        });
    });    

    it('can GET all the users', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      const params = { user };
      const newUser = await app.service('api/users').create(user, params);

      return rp.get({ url: baseUrl + usersService, json: true })
        .then(res => {
          assert.deepInclude(res.data, newUser);
        });
    });

    it('can POST one task', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      const params = { user };
      const newUser = await app.service('api/users').create(user, params);

      let body = { name: 'My task', description : 'Description of task', date_time : '2016-05-25 14:25:00'};
  
      return rp.post({ url: baseUrl + tasksService.replace(/:userId/g, newUser.id), json: true, body })
        .then(res => {
          assert.containsAllKeys(res, body);
          assert.equal(res.name, body.name);
          assert.equal(res.description, body.description);
          assert.equal(Date.parse(res.date_time), Date.parse(body.date_time));
          assert.equal(res.user_id, newUser.id);
        });
    });

    it('can PATCH one task', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      let params = { user };
      const newUser = await app.service(usersService).create(user, params);
      const task = { name: 'My task', description : 'Description of task', date_time : '2016-05-25 14:25:00'};
      params = { userId: newUser.id };
      const newTask = await app.service(tasksService).create(task, params);

      let body = { name: 'My updated task' };
      return rp.patch({ url: baseUrl + tasksService.replace(/:userId/g, newUser.id) + newTask.id, json: true, body })
        .then(res => {
          assert.include(res, body);
          assert.isNotNull(res.description);
          assert.equal(res.description, newTask.description);
        });
    });

    it('can DELETE one task', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      let params = { user };
      const newUser = await app.service(usersService).create(user, params);
      const task = { name: 'My task', description : 'Description of task', date_time : '2016-05-25 14:25:00'};
      params = { userId: newUser.id };
      const newTask = await app.service(tasksService).create(task, params);

      return rp.delete({ url: baseUrl + tasksService.replace(/:userId/g, newUser.id) + newTask.id, json: true })
        .then(res => {
          assert.containsAllKeys(res, newTask);
          assert.equal(res.name, newTask.name);
          assert.equal(res.description, newTask.description);
          assert.equal(Date.parse(res.date_time), Date.parse(newTask.date_time));
          assert.equal(res.user_id, newUser.id);
        });
    });

    it('can GET one task', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      let params = { user };
      const newUser = await app.service('api/users').create(user, params);
      const task = { name: 'My task', description : 'Description of task', date_time : '2016-05-25 14:25:00'};
      params = { userId: newUser.id };
      const newTask = await app.service(tasksService).create(task, params);

      return rp.get({ url: baseUrl + tasksService.replace(/:userId/g, newUser.id) + newTask.id, json: true })
        .then(res => {
          assert.containsAllKeys(res, newTask);
          assert.equal(res.name, newTask.name);
          assert.equal(res.description, newTask.description);
          assert.equal(Date.parse(res.date_time), Date.parse(newTask.date_time));
          assert.equal(res.user_id, newUser.id);
        });
    });

    it('can GET all tasks of a user', async () => {
      const user = { username: 'jsmith', first_name: 'John', last_name: 'Smith' };
      let params = { user };
      const newUser = await app.service('api/users').create(user, params);
      const task = { name: 'My task', description : 'Description of task', date_time : '2016-05-25 14:25:00'};
      params = { userId: newUser.id };
      await app.service(tasksService).create(task, params);

      return rp.get({ url: baseUrl + tasksService.replace(/:userId/g, newUser.id), json: true })
        .then(res => {
          assert.isArray(res.data);
          assert.isAtMost(res.data.length, 1);
        });
    });
  });
});
