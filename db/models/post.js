'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
     text: DataTypes.STRING,
     image: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
   Post.belongsTo(models.User, {
      foreignKey: 'userId',
       onDelete: 'CASCADE'
    })
  };
  return Post;
};