const db = require('../../data/db-config.js')

async function getAll() {
  // DO YOUR MAGIC
  const result = await db('accounts')
  return result
}

async function getById(id) {
  // DO YOUR MAGIC
  const result = await db('accounts').where('id', id).first()
  return result
}

async function create(account) {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  const post = await getById(id) // not necessary in postgres
  return post
}

async function updateById(id, account) {
  // DO YOUR MAGIC
  await db('accounts')
  .update(account)
  .where('id', id)
  return getById(id)
}

async function deleteById(id) {
  // DO YOUR MAGIC
  const result = await db('accounts').del().where('id', id)
  return result
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
