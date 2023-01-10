'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
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
      },
      {
        url: 'https://dq5w2ex467fab.cloudfront.net/morongocasinoresort.com-1761492892/cms/cache/v2/60e5de0aacae1.jpg/1920x1080/fit/80/7d65af0720b59cd988868ffeef674f21.jpg',
        preview: true,
        spotId: 4
      },
      {
        url: 'https://galeriemagazine.com/wp-content/uploads/2019/02/Stahl2-1920x1200.jpg',
        preview: true,
        spotId: 5
      },
      {
        url: 'https://robbreport.com/wp-content/uploads/2022/01/Cielo2.jpg',
        preview: true,
        spotId: 6
      },
      {
        url: 'https://cdn.tollbrothers.com/communities/13313/images-resized/Flora_Haralson_FTElevation_3194-1_1920.jpg',
        preview: true,
        spotId: 7
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740520829652124473/original/0e453947-a99c-4f2f-b7ce-753606a62f53.jpeg',
        preview: true,
        spotId: 8
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options)
  }
};
