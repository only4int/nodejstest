'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
       type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          Key: 'id',
          as: 'userId'
        }
      }, 
      postId: {
       type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Posts',
          Key: 'id',
          as: 'postId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};