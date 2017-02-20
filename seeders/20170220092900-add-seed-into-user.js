'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
      email: 'irwin@pratajaya.com',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      email: 'endy@pratajaya.com',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      email: 'daniel@pratajaya.com',
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
