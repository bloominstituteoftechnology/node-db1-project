const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = async (id) => {
  // DO YOUR MAGIC
  const result  = await db('accounts')
    .where('id', id).first()
  return result
}

const create = async (account) => {
  // DO YOUR MAGIC
  const [ id ] = await db('accounts')
   .insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts')
   .where('id', id)
   .update(account)
  return getById(id)
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const delectAccount = await getById(id) 
  await db('accounts')
    .where({ id })
    .del()
  return delectAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
