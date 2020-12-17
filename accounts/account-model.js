const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

function find() {
    return db('accounts')
}

function insert(account) {
    return db('accounts')
    .insert(account)
    .then(ids => {
        return getById(ids[0])
    })
}

function getById(id) {
    return db('accounts')
        .where({id})
        .first()
}

function remove(id) {
    return db('accounts')
        .where('id', id)
        .del()
}
function update(id,changes ) {
    return db('accounts')
    .where({id})
    .update(changes)
}
module.exports = {
    find,
    insert,
    getById,
    remove,
    update
}