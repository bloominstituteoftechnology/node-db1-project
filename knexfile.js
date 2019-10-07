module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/budget.db3', //DB driver
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
};
