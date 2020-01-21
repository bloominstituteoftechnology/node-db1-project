const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
}

function find() {
return db('accounts');
}

function findById(id) {
return db('accounts').where({ id: Number(id) })
.first();
}

function insert(accounts) {
return db('accounts')
    .insert(accounts)
    .then(ids => ({ id: ids[0] }));
}

function update(id, accounts) {
return db('accounts')
    .where('id', Number(id))
    .update(accounts);
}

function remove(id) {
return db('accounts')
    .where('id', Number(id))
    .del();
}