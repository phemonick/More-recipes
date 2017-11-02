export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
