const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first()
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts').insert({ 'account': account })
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  db('accounts').where('id', id).update({ 'account': account }) 
}

const deleteById = id => {
  // DO YOUR MAGIC
  db('accounts').where('id', id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
