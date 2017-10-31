'use strict';
export default (sequelize, DataTypes) => {
  var Downvote = sequelize.define('Downvote', {
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
  Downvote.associate = (models) => {
    Downvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Downvote.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Downvote;
};