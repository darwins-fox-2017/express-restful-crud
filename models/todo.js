'use strict';
module.exports = function(sequelize, DataTypes) {
  var todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    iscompleate: DataTypes.BOOLEAN,
    completeAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        todo.belongsTo(models.User, { foreignKey:'userId'} );
      }
    }
  });
  return todo;
};
