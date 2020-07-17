const knex = require("knex");

const knexfile = require("../knexfile.js");

// change to "production" and update knexfile.js to use postgres.
const database = "development";
//const database = "production";

module.exports = knex(knexfile[database]);
