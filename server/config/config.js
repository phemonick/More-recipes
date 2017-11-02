require('dotenv').config();

console.log(process.env.DATABASE_URL);

module.exports = {
  development: {
    username: 'postgres',
    password: 'teleios',
    database: 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'zdabacfvyhjfht',
    password: '05ab1cc3dbb156615a78c0be9d96780b1dbba021cf0958b694afd930be5c6258',
    database: 'dfsm6g9e0ieuir',
    host: 'ec2-50-19-110-195.compute-1.amazonaws.com',
    dialect: 'postgres',
  },
};
