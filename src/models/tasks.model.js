const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const tasks = sequelizeClient.define('tasks', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    dateTime: {
      type: DataTypes.DATE,
      field: 'date_time'
    }
  }, {
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
