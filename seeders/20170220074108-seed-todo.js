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
    return queryInterface.bulkInsert('Todos', [{
      title: 'makan siang',
      is_complete: false,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'jalan jalan',
      is_complete: false,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'lari pagi',
      is_complete: false,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'tidur',
      is_complete: false,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'cuci baju',
      is_complete: true,
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'beli jam',
      is_complete: false,
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
