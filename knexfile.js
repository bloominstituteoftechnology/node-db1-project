module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/budget.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  // update the following configuration to use PostgreSQL
  // production: {
  //   client: "pg",
  //   connection: {
  //     host: "localhost", // if the server is not running on your computer provide the network address
  //     database: "tatiana", // <-- update
  //     user: "tatianaz", // <-- update
  //     password: "tzpassword", // <-- update
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     directory: "./data/migrations",
  //     tableName: "knex_migrations",
  //   },
  //   seeds: {
  //     directory: "./data/seeds",
  //   },
  // },
};
