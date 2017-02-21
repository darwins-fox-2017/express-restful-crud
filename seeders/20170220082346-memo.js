'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memos', [{
      title: 'Belajar sequelize todos-1',
      is_complete: '',
      user_email: 'bambang@idbmb.web.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Belajar sequelize todos-2',
      is_complete: '',
      user_email: 'learn@hacktiv8.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Belajar sequelize todos-3',
      is_complete: '',
      user_email: 'trial@hacktiv8.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Belajar sequelize todos-4',
      is_complete: '',
      user_email: 'tester@hacktiv8.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */


  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
