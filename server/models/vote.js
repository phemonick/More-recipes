export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    options: {
      type: DataTypes.BOOLEAN,
    },
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Vote.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Vote;
};
