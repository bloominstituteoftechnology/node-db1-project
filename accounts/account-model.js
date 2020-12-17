const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

function find() {
    return db('accounts')
}


module.exports = {
    find
}