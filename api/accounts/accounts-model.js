const getAll = () => {
  // DO YOUR MAGIC
  return db('account')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first()
}

const create = async (accounts) => {
  // DO YOUR MAGIC
 const {id}= await db('account').insert({name, budget})
  const {name, budget}=accounts
  return getById
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  id = Number(id)
  await db('account').where('id', id).update({name, budget})
  return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
  const deletedAccount = await getById(id)
  await db('account').where('id', id).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
