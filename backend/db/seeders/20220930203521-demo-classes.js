'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Classes';
    return queryInterface.bulkInsert(options, [
      {
        id: '1',
        class: 'Rooms',
        pic: 'https://i.imgur.com/WUkDE02.png'
      },
      {
        id: '2',
        class: 'Beachfront',
        pic: 'https://i.imgur.com/ja1zLzG.png'
      },
      {
        id: '3',
        class: 'Homes',
        pic: 'https://i.imgur.com/ChR1baY.png'
      },
      {
        id: '4',
        class: 'Cabins',
        pic: 'https://i.imgur.com/8VvgSlc.png'
      },
      {
        id: '5',
        class: 'Lakefront',
        pic: 'https://i.imgur.com/3PpTFzM.png'
      },
      {
        id: '6',
        class: 'Mansions',
        pic: 'https://i.imgur.com/DqiBf7L.png'
      },
      {
        id: '7',
        class: 'Farms',
        pic: 'https://i.imgur.com/pEer5eg.png'
      },
      {
        id: '8',
        class: 'Castles',
        pic: 'https://i.imgur.com/HBncxj3.png'
      },
      {
        id: '9',
        class: 'Desert',
        pic: 'https://i.imgur.com/f9K6cok.png'
      },
      {
        id: '10',
        class: 'Boats',
        pic: 'https://i.imgur.com/wQG2viW.png'
      },
      {
        id: '11',
        class: 'Domes',
        pic: 'https://i.imgur.com/Qh95Oro.png'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Classes';
    return queryInterface.bulkDelete(options)
  }
};
