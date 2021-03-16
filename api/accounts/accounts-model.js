const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}
const getById = id => {
  return db('accounts').where('id', id).first()
}
const create = async account => {
  const [id] = await db('accounts').insert(account, ['name', 'budget'])
  return getById(id)
}
const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}
const deleteById = async id => {
  const toBeChopped = await getById(id)
  await db('accounts').where({ id }).del()
  return toBeChopped
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
