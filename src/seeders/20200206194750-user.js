'use strict';

let faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [...Array(10).keys()].map((_) => {
      return {
        username: faker.name.username(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      }
    });

    return queryInterface.bulkInsert('People', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
