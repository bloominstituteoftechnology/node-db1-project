const db = require('../../data/db-config')


// R
const getAll = () => {

  return db('accounts')
  // DO YOUR MAGIC
}
//  R specific
const getById = id => {
  return db('accounts').where('id', id).first()
  // DO YOUR MAGIC
}
// C
async const create = account => {
  const[id] = await db('accounts').insert(account)
  // DO YOUR MAGIC
}
// U
async const updateById = (id, account) => {
  await db('accounts').where('id', id).update(id, account)

  // DO YOUR MAGIC
}
// D
async const deleteById = id => {
  const deletedAccount = await getById(id)
  await db('account').where('id', id).delete()

  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
