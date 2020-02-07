const userModel = require('./users.js');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', userModel, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    timestamps: false
  });

  users.associate = function (models) { // eslint-disable-line no-unused-vars
    users.hasMany(models.tasks, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false
      }
    });
  };

  return users;
};
