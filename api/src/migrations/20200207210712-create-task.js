'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      dateTime: {
        type: Sequelize.DATE,
        field: 'date_time'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        field: 'user_id',
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
    return queryInterface.dropTable('tasks');
  }
};
