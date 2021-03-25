const db = require("../../data/db-config")

const getAll = () => {
  return db('accounts')
  // DO YOUR MAGIC
}

const getById = id => {
 const account = db.first('*').from('accounts').where({ id })
  return account
  // DO YOUR MAGIC
}

const getByName = name => {
  return db.first('*').from('accounts').where({ name })
}

const create = async account => {
  const newAcc = await db('accounts').insert(account)
  return newAcc
  // DO YOUR MAGIC
}

const updateById = async (id, account) => {
  const updatedAccount = await db.update(account).from('accounts').where({ id })
  console.log(updatedAccount, "updated acc")
  return updatedAccount
  // DO YOUR MAGIC
}

const deleteById = async id => {
  const deleted = await db('accounts').del().where({ id })
  return deleted
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
