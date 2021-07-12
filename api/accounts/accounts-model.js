const db = require('../../data/db-config')

const getAll = async () => {
  const accounts = await db('accounts')
  return accounts
}

const getById = async (id) => {
  const account = await db('accounts')
  .where('id', id).first()
   return account
}

const create = account => {
   return 'create wired'
}

const updateById = (id, account) => {
   return 'updateById wired'
}

const deleteById = id => {
   return 'deleteById wired'
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
