'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Pessoas', // table name
        'teste', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Pessoas', 'teste')
    ]);
  }
};
