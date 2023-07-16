'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Great',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Meh',
        stars: 3
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Worst place',
        stars: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkDelete(options)
  }
};
