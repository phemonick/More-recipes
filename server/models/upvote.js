'use strict';
module.exports = (sequelize, DataTypes) => {
  var upvote = sequelize.define('upvote', {
    vote: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    }
  } );
  Upvote.associate = (models) => {
    Upvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Upvote.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Downvote;
};