// connects model w/ db config
const db = require('../../data/db-config.js') 

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({id})
}

const create = async account => {
  // DO YOUR MAGIC
  // QUESTION: if don't use the await and just return account after the insert, the new info is not saved to the DB?
  const [id] = await db('accounts').insert(account,['id'])
  return getById(id)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
