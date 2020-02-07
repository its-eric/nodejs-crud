module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
    return queryInterface.dropTable('users');
  }
};