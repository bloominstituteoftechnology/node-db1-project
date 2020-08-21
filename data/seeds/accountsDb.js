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
    .select('*')
    .from('accounts')
    .where({id})
    .first();
}

function insert(payload) {
  return db('accounts')
    .insert(payload, "id")
    .then(id => {
        return findById(id);
    });
}

function update(id, changes) {
    return db('accounts')
      .where({ id })
      .update(changes, '*');
} 

function remove(id) {
  return db('accounts')
    .where({ id })
    .del();
}

