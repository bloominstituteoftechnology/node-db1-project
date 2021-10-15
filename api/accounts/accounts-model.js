const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = idParam => {
  // DO YOUR MAGIC
  return db('accounts').where('id', idParam).first()
  // Get all accounts where the id column, is equal to the id passed in
}

const create = async ({ name, budget }) => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert({ name, budget })
  return getById(id)
}

const updateById = async (id, { name, budget }) => {
  // DO YOUR MAGIC
  await db("accounts").where("id", id).update({ name, budget })
  return getById(id)
}

const deleteById = async (id) => {
  const deletedPost = await getById(id)
  await db("accounts").where("id", id).delete()
  return deletedPost
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
