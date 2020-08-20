const db = require('../dbConfig.js');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('accounts');
}

function findById(id) {
  return db('accounts')
    .where({ id })
    .first();
}

function insert(account) {
  return db('accounts')
    .insert(account, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('accounts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('accounts')
    .where('id', id)
    .del();
}