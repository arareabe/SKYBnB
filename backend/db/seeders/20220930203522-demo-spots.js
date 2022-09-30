'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        address: '111 Vault Lane',
        city: 'Washington',
        state: 'WA',
        country: 'USA',
        lat: 32,
        lng: 34,
        name: 'Crystal Cabin',
        description: 'Great views in Vault City',
        price: 209
      },
      {
        address: '946 Arrow St',
        city: 'Las Vegas',
        state: 'NV',
        country: 'USA',
        lat: 42,
        lng: 56,
        name: "Getaway Townhouse",
        description: 'Enjoy pleasures of Sin City',
        price: 420
      },
      {
        address: '337 Arrow St',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        lat: 78,
        lng: 82,
        name: 'Canyon Bobcat',
        description: 'Handscrafted cabin in NYC',
        price: '320'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Spots', {
    address: ['111 Vault Lane', '946 Arrow St', '337 Arrow St']
   }, {})
  }
};
