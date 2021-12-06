const db = require('../../data/db-config')
const getAll = () => {
  const accounts = await db('accounts')
  return accounts
}

const getById = id => {
  const account = await db('accounts')
  .where('id', id).first()
  return account
}

const create = account => {
  const [ id ] = await db('accounts')
    .insert({
      name: account.name.trim(),
      budget: account.budget
    })
   const newAccount = await getById(id)
   return newAccount
}

const updateById = (id, account) => {
    await db('accounts')
      .where('id', id)
      .update(account)
     return getById(id)
}

const deleteById = id => {
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