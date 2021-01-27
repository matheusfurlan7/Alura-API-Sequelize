'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pessoas', [
      {
        nome: "Matheus Furlan",
        ativo: true,
        email: "matheus@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pessoas', null, {});
  }
};
