'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'user1@example.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Zoey',
      email: 'user2@example.com',
      password: '1111',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
