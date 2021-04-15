const db = require('../../data/db-config')


const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({id}).first();
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts').insert(account)
  .then(ids => {
    return getById(ids[0])
  })
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').where({id}).update(account)
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
