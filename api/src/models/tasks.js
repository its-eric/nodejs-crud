const Sequelize = require('sequelize');

module.exports =  {
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
  }
};