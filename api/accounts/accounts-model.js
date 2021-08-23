const db = require("../../../node-api3-project/data/db-config")



const getAll = async () => {
  // DO YOUR MAGIC
  return db('account')
}

const getById = async id => {
  // DO YOUR MAGIC
  return db('accounts')
  .where('id', id)
  .first()
}

const create = async ({name, budget}) => {
  // DO YOUR MAGIC
  const [id]= await db('account')
    .insert({name, budget})
  
  return getById(id)
}

const updateById = async (id, {name, budget}) => {
  // DO YOUR MAGIC
  
  await db('account')
  .where('id', id)
  .update({name, budget})
  return getById(id)
}

const deleteById = async id =>  {
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
