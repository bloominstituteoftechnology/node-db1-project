const db = require('../../data/db-config')

const getAll = async () => {
  const result = await  db('accounts')
  return result
}

const getById =  async id => {
  const [account] = await db('accounts').where('id', id)
  return account
}

const create =  async account => {
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id)
  return getById(id)
}

const deleteById = async id => {
  const result = await db('accounts').del().where('id', id)
  return result
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
