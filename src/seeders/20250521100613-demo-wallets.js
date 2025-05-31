'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wallets', [
      {
        userId: 10,
        balance: 1000000,
        currency: 'VND',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 11,
        balance: 500000,
        currency: 'VND',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 12,
        balance: 200000,
        currency: 'VND',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wallets', null, {});
  }
};