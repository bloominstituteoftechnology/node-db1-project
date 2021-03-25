const db = require("../../data/db-config")

const getAll = () => {
  return db('accounts')
  // DO YOUR MAGIC
}

const getById = id => {
  return db.first('*').from('accounts').where({ id })
  // DO YOUR MAGIC
}

const getByName = name => {
  return db.first('*').from('accounts').where({ name })
}

const create = async account => {
  return await db('accounts').insert(account)
  // DO YOUR MAGIC
}

const updateById = async (id, account) => {
  return await db.update(id, account).from('accounts').where({ id })
  // DO YOUR MAGIC
}

const deleteById = async id => {
  return await db('accounts').del().where({ id })
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
