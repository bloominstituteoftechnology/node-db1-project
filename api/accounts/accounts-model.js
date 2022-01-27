const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts')
  .where('id', id)
  .first()
}

const create = account => {
 return db('accounts')
 .create(account)
 .then(id => {
   return getById(id)
 })
}

const updateById = (id, account) => {
  return db('accounts')
  .where('id', id)
  .updateById(account)
}

const deleteById = id => {
  return db('accounts')
  .where('id', id)
  .deleteById()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
