const knex = require("knex");
const configs = require("../knexfile.js");
const environment = process.env.NODE_ENV || "development";

module.exports = knex(configs[environment]);

// const knex = require('knex');

// const config = {
//   client: 'sqlite3',
//   connection: {
//     filename: './data/posts.db3',
//   },
//   useNullAsDefault: true,
// };

// module.exports = knex(config);
