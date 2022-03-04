const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  // select * from accounts
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  //  select * from accounts where id = id
  return db('accounts').where('id', id).first()
}

const create = ({name, budget}) => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert({name, budget})
  return getById(id)
}

const updateById = (id, {account, budget}) => {
  // DO YOUR MAGIC 
  await db('accounts').where('id', id).update({account, budget})
  return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
  const deletedAccount = await getById(id)
  await db('accounts').where('id', id).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
