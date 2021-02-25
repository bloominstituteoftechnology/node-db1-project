const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({id})
}

const create = async account => {
  // DO YOUR MAGIC
  return db('accounts')
    .insert(account)
    .then(ids => {
      return getById(ids[0])
    });
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
    .update(account);
}

const deleteById = async id => {
  // DO YOUR MAGIC
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
