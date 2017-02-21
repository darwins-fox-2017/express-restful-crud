'use strict';
module.exports = function(sequelize, DataTypes) {
  var todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    is_complete: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        todo.belongsTo(models.user, {foreignKey: "userId"})
      }
    }
  });
  return todo;
};
