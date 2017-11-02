export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input name',
        },
        isAlphanumeric: {
          args: true,
          msg: 'must be alphanumeric',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input descriptions',
        },
      },
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input ingredients',
        },
      },
    },
    upVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        as: 'userId',
      },
    },
  });
  
  Recipes.associate = (models) => {
    Recipes.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Recipes.hasMany(models.Review, {
      foreignKey: 'recipeId',
    });
    Recipes.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
    });
    Recipes.hasMany(models.Vote, {
      foreignKey: 'recipeId',
    });
  };

  return Recipes;
};
