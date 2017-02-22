'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {isEmail: true,
        isUnique: function(value, next) {
          User.find({
            where: {email:value},
            attributes: ['id']
          }).then(function(data, error) {
            if (error)
              return next(error)

            if(data)
              return next('Email is used')

            next()
          })
        }
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Todo);
      }
    }
  });
  return User;
};
