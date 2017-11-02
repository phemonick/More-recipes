export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input username',
        },
        len: {
          args:[3],
          msg: 'input valid username'
        },
        isAlphanumeric: {
          args: true,
          msg: 'must be alphanumeric',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input name',
        },
        len: {
          args:[3],
          msg: 'input valid username'
        },
        isAlphanumeric: {
          args: true,
          msg: 'must be alphanumeric',
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input surname',
        },
        isAlphanumeric: {
          args: true,
          msg: 'must be alphanumeric',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args:[3],
          msg: 'input valid username'
        },
        notEmpty: {
          args: true,
          msg: 'input password',
        },
      },
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Vote, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Recipes, {
      foreignKey: 'userId',
      as: 'recipes',
    });
  };
  return User;
};
