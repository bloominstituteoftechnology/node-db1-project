module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/budget.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  // update the following configuration to use PostgreSQL
  production: {
    client: 'pg',
    connection: {
      host: 'localhost', // if the server is not running on your computer provide the network address
      database: 'the name of the database to use in the postgres server', // <-- update
      user: 'a user that has access to the server and database', // <-- update
      password: 'the password for the user', // <-- update
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
