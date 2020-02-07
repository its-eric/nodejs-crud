const taskModel = require('./tasks');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const tasks = sequelizeClient.define('tasks', taskModel, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    timestamps: false
  });

  tasks.associate = function (models) {
    tasks.belongsTo(models.users, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false
      }
    });
  };

  return tasks;
};
