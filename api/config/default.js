const db = require('./database');

module.exports = {
  host: 'localhost',
  port: 3030,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50
  },
  dialect: 'mysql',
  dbUrl: 'mysql://' + db.username + ':' + db.password + '@' + db.host + ':' + db.port + '/' + db.database
};
