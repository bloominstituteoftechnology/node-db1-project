const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

async function getById (id) {
  const result = await db('accounts').where('id', id).first()
  return result
}

async function create(account) {
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

async function updateById (id, account) {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

async function deleteById (id) {
  const toDelete = await getById(id)
  await db('accounts').where({id}).del()
  return toDelete
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
