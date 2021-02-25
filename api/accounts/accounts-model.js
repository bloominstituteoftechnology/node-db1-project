const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts')
    .where({id})
}

const getByName = name => {
  return db('accounts')
    .where({name})
}

const create = async account => {
  return db('accounts')
    .insert(account)
    .then(ids => {
      return getById(ids[0])
    });
}

const updateById = async (id, account) => {
  return db('accounts')
    .where({ id })
    .update(account);
}

const deleteById = async id => {
  return db('accounts')
    .where('id', id)
    .del();
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
