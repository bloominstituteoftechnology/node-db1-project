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

const create = async (account) => {
  const [ id ] = await db('accounts')
    .insert({
      name: account.name.trim(),
      budget: account.budget
    })
   return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts')
    .where('id', id)
    .update(account)
   return getById(id)
}

const deleteById = async (id) => {
  const deletedAccount = await getById(id)
  await db('accounts')
    .where({ id })
    .del()
   return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
