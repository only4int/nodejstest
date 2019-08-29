'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
  }, {});
  Request.associate = function(models) {
   Request.belongsTo(models.User, {
      foreignKey: 'userId',
       onDelete: 'CASCADE'
    })
  };
  return Request;
};