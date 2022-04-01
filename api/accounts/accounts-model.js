const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account)
  return getById(id)
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
