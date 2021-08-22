const db = require('../../data/db-config');

const getAll = async () => {
  return db('accounts')
}

const getById = async id => {
  return db('accounts').where('id', id).first()
}

const create = async ({name, budget}) => {
  const [id] = await db('accounts').insert({name, budget})
  return getById(id)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
