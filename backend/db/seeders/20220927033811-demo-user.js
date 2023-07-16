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
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: '2',
        email: 'user1@user.io',
        firstName: 'Weenie',
        lastName: 'Hut',
        username: 'FakerUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: '3',
        email: 'user2@user.io',
        firstName: 'Sky',
        lastName: 'Rim',
        username: 'FakerUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options)
  }
};
