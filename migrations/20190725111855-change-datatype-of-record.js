'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Records', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Records', 'date', {
      type: DataTypes.DATE,
    })
  }
};
