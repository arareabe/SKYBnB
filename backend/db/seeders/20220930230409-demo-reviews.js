'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'Great',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Meh',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Worst place',
        stars: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      review: ['Great', 'Meh', 'Worst place']
    })
  }
};
