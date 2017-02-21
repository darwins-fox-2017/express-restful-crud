'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users",[
      {
        email:"sampleOne@email.com",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        email:"sampleTwo@email.com",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        email:"sampleThree@email.com",
        createdAt:new Date(),
        updatedAt:new Date()
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
