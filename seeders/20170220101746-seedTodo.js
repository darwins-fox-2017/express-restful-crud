'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("todos",[
      {
        title:"Belajar Coding",
        is_complete:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title:"Nonton Bioskop",
        is_complete:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title:"Piknik",
        is_complete:false,
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
