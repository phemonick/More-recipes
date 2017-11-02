'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    content: {
      type: DataTypes.STRING
    },
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
  Favorite.associate = function (models) {
    Favorite.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Favorite;
};