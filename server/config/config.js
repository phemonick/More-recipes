module.exports = {
  development: {
    username: 'postgres',
    'password': 'teleios',
    'database': 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'teleios',
    database: 'more-recipes_test',
    'host': '127.0.0.1',
    dialect: 'postgres',
    'logging': false,
  },
  'production': {
    use_env_variables: 'DATABASE_URL',
  },
};
