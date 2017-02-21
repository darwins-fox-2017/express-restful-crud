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
      email: 'samuel@sam.com',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      email: 'firman@man.com',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      email: 'amel@lia.com',
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
