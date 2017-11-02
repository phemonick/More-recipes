'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    options: {
      type: DataTypes.BOOLEAN
    }
  });

  Vote.associate = function (models) {
    Vote.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Vote.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Vote;
};