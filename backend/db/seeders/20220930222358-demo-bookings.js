'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '21-01-07',
        endDate: '22-01-10'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '22-02-03',
        endDate: '22-02-05'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '22-03-09',
        endDate: '22-03-15'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
      startDate: ['22-01-07', '22-02-03', '22-03-09']
    }, {})
  }
};
