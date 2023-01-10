'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
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
      },
      {
        address: '1436 Rowling Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 38,
        lng: 42,
        name: 'The Tops Resort',
        description: 'Swanky place right along the Courier River',
        price: '521'
      },
      {
        address: '222 Burrows Lane',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 25,
        lng: 44,
        name: 'Lucky 38 Cottage',
        description: 'An isolate cottage in Seattle with very cozy vibes.',
        price: '320'
      },
      {
        address: '3544 Barringstone Ave',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 21,
        lng: 43,
        name: 'The Barringstone Mansion',
        description: 'Luxurious and in pristine condition since the 18th century',
        price: '649'
      },
      {
        address: '109 Row St',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        lat: 18,
        lng: 22,
        name: 'Sky Tower',
        description: 'Perched high on an oceanside hill, the view is to die for.',
        price: '120'
      },
      {
        address: '8793 Melody Ave',
        city: 'Orlando',
        state: 'FL',
        country: 'USA',
        lat: 55,
        lng: 43,
        name: 'Lakefront Townhouse',
        description: 'A private townhouse right by a lake, offers very convenient quarters to those stopping by.',
        price: '226'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options)
  }
};
