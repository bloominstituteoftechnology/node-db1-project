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

const updateById = async (id, {name, budget}) => {
  await db('accounts').where("id",id).update({name, budget})
  return getById(id)
}

const deleteById = async id => {
  const deletedAccount = await getById(id)
  await db('accounts').where("id",id).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
