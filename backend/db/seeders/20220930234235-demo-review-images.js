'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'www.crazy.com'
      },
      {
        reviewId: 2,
        url: 'www.funny.com'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', {
      url: ['www.crazy.com', 'www.funny.com']
    })
  }
};
