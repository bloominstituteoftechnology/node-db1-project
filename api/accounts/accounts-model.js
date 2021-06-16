// bring in the db config file so we can use knex
const db = require('../../data/db-config');


const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts") // select * from accounts
  // return db("accounts").select("contents") // select * from accounts, just return contents column, return as array of obj
}

const getById = id => {
  // DO YOUR MAGIC
  // select * from accounts where accountid = userGivenId
  //  "id" refers to column id, id returns to the passed id
  return db("accounts").where("id", id).first()
  // .first() gives you just the object
}

const create = async (account) => {
  // DO YOUR MAGIC
  const [id] = await db("accounts").insert({account})
  return getById(id)
}

// async function create({account}) {
//   const [id] = await db("accounts").insert({title,contents})
//   return getById(id)
// }

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").where("id", id).update({account})
  return getById(id)
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const deletedAccount = await getById(id)
  await db("accounts").where("id", id).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
