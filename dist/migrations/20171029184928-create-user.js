'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "input username"
          }
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "input name"
          }
        }
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "input surname"
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "input email"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "input password"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};