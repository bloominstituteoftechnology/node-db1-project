// connects model w/ db config
const db = require('../../data/db-config.js') 

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  // QUESTION: why do we need first if we are just pulling 1 ID? Redundancy?
  return db('accounts').where({id}).first()
}

const create = async account => {
  // DO YOUR MAGIC
  // QUESTION: if don't use the await and just return account after the insert, the new info is not saved to the DB?
  const accountTrimmed = {
    "name": account.name.trim(),
    "budget": account.budget
  } 
  // QUESTION: TRIM DOES NOT WORK
  const [id] = await db('accounts').insert(accountTrimmed,['id'])
  return getById(id)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const toBeDeleted = await getById(id) // get the account
  await db('accounts').where('id',id).del() // delete the account
  return toBeDeleted // return what you just deleted

}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
