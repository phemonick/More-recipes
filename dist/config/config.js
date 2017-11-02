'use strict';

module.exports = {
  development: {
    username: 'postgres',
    'password': 'teleios',
    'database': 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'teleios',
    database: 'more-recipes_test',
    'host': '127.0.0.1',
    dialect: 'postgres',
    'logging': false
  },
  'production': {
    username: 'root',
    'password': null,
    database: 'database_production',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  }
};