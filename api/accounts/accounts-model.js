const db = require('../../data/db-config');

const getAll = (limit = null, sortby = 'id', sortdir = 'asc') => {
    if (limit){
        return db("accounts")
        .limit(limit)
        .orderBy(sortby, sortdir)
    }
    return db("accounts")
    .orderBy(sortby, sortdir)
}

const getById = id => {
    return db("accounts")
    .where('id', id)
    .first();
}

const create = account => {
    return db("accounts")
    .insert(account)
    .then(ids => {
        return getById(ids[0]);
    });
}

const updateById = (id, account) => {
    return db('accounts')
    .where('id', id)
    .update(account);
}

const deleteById = id => {
    return db('accounts')
    .where('id', id)
    .del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
