'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        url: 'https://cdn.decoist.com/wp-content/uploads/2017/05/A-low-cabin-illuminated-with-yellow-lights.jpeg',
        preview: true,
        spotId: 1
      },
      {
        url: 'www.crazyimage.com',
        preview: true,
        spotId: 2
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {
      address: ['www.funnyimage.com', 'www.crazyimage.com']
    }, {})
  }
};
