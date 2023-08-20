'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        id: '1',
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'Man',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        avatar: 'https://i.imgur.com/P66DeqF.png'
      },
      {
        id: '2',
        email: 'user1@user.io',
        firstName: 'Weenie',
        lastName: 'Hut',
        username: 'FakerUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        avatar: 'https://i.imgur.com/Iur6NJh.png'
      },
      {
        id: '3',
        email: 'user2@user.io',
        firstName: 'Sky',
        lastName: 'Rim',
        username: 'FakerUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        avatar: 'https://i.imgur.com/azeO6hB.png'
      },
      {
        id: '4',
        email: 'barney@user.io',
        firstName: 'Barney',
        lastName: 'Timmberly',
        username: 'BarnesNobles',
        hashedPassword: bcrypt.hashSync('password4'),
        avatar: 'https://i.imgur.com/Ca1yCpB.png'
      },
      {
        id: '5',
        email: 'masterchief@user.io',
        firstName: 'John',
        lastName: 'Petty',
        username: 'Spartan',
        hashedPassword: bcrypt.hashSync('halo'),
        avatar: 'https://i.imgur.com/iEmdvZQ.png'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options)
  }
};
