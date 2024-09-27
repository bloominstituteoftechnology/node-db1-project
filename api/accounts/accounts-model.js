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
 const create = async (account) => {
  const[id] = await db('accounts').insert(account)
  
return(getById)

  // DO YOUR MAGIC
}
// U
 const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(id, account)
return updateById(id)
  // DO YOUR MAGIC
}
// D
async const deleteById = async (id) => {
  const deletedAccount = await getById(id)
  await db('account').where('id', id).delete()

  return deletedAccount

  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}