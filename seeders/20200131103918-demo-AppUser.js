'use strict';
const AppUser = require('../models/AppUser.model');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(AppUser, [{
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      email: 'example@example.com' + Math.floor(Math.random() * Math.floor(10000)) ,
      minAge: 19,
      maxAge: 30
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AppUser', null, {});
  }
};
