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
        id: 1,
        spotId: 1,
        userId: 2,
        review: 'Beautiful place to stay in a house as serene as the surroundings. Would go back.',
        stars: 4
      },
      {
        id: 2,
        spotId: 2,
        userId: 3,
        review: "This was our second stay, and we plan to keep coming back. The architecture is stunning, and time in the outside world feels like it's standing still.",
        stars: 3
      },
      {
        id: 3,
        spotId: 3,
        userId: 2,
        review: 'Not me, but my dad; stayed in a place that turned out to be a halfway house/boarding house for released tiger monkeys.',
        stars: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkDelete(options)
  }
};
