'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post,{
      foreignKey: 'userId',
       as: 'posts'
    }),
    User.hasMany(models.Like,{
      foreignKey: 'userId',
       as: 'likes'
    })
  };
  return User;
};