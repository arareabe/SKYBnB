'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        url: 'www.funnyimage.com',
        preview: true
      },
      {
        url: 'www.crazyimage.com',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {
      address: ['www.funnyimage.com', 'www.crazyimage.com']
    }, {})
  }
};
