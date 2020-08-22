const db = require('../dbConfig.js');

// this should go inside of data folder or accounts routers, not on seeds. 
// keyword functions/function declar., thy get hoisted and moved to top of file, that way referenced before defined. If arrow functions, exports must go below. Since using "function" keyword and not arrow functions, it can go at the top


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
    .where({id})
    .first();
}

async function insert(payload) {
  const id = await db('accounts')
    .insert(payload, "id")
  return findById(id);
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

