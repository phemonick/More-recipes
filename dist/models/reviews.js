'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    content: DataTypes.STRING,

    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    }
  });
  Review.associate = function (models) {
    Review.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};