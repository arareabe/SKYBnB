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
        url: 'https://assets-news.housing.com/news/wp-content/uploads/2022/01/10145854/most-beautiful-houses2.png',
        preview: true,
        spotId: 2
      },
      {
        url: 'https://1.bp.blogspot.com/-efnC_54GPGI/XU_382v9tzI/AAAAAAAAUug/ogPWFEJZUzMNQUuwtZcPcKLaaYw4SiYTQCLcBGAs/s1600/Beautiful%2BHomes%2Bin%2BLos%2BAngeles%252C%2BCalifornia%2B1.jpg',
        preview: true,
        spotId: 3
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {})
  }
};
