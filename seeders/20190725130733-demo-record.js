'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Records', [{
      name: '午餐', category: '餐飲食品', date: '2019-06-29', amount: 150, UserId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '捷運', category: '交通出行', date: '2019-07-01', amount: 35, UserId: 7, createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '房貸', category: '家居物業', date: '2019-07-02', amount: 30000, UserId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '電影票', category: '休閒娛樂', date: '2019-06-30', amount: 300, UserId: 8, createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
