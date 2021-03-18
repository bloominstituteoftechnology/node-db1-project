const knex = require('knex');
const config = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(config[environment]);
