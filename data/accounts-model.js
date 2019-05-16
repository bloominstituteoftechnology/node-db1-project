const db = require('./dbConfig');

module.exports = {
  find,
  findById,
  add,
  remove,
  update
};

function find(query={}) {
  let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('accounts')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('accounts')
    .where({ id })
    .first();
}

async function add(account) {
  const [id] = await db('accounts').insert(account);

  return findById(id);
}

function remove(id) {
  return db('accounts')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('accounts')
    .where({ id })
    .update(changes, '*');
}