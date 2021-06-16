// bring in the db config file so we can use knex
const db = require('../../data/db-config');


const getAll = () => {
  return db("accounts") // select * from accounts
  // return db("accounts").select("contents") // select * from accounts, just return contents column, return as array of obj
}

const getById = id => {
  // select * from accounts where accountid = userGivenId
  //  "id" refers to column id, id returns to the passed id
  return db("accounts").where("id", id).first()
  // .first() gives you just the object ... not in an array [{}]
}

const create = async (newAccount) => {
  const {name, budget} = newAccount
  const [id] = await db("accounts").insert({name, budget})
  return getById(id)
}

/*
An alternate way to write it using named function:
 async function create({account}) {
  const [id] = await db("accounts").insert({title,contents})
  return getById(id)
}
*/

const updateById = async (id, {name, budget}) => {
  id = Number(id); // convert passed string to int
  await db("accounts").where("id", id).update({name, budget})
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

// curl -d '{"name":"test", "budget": 1234}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/accounts/

// curl -X PUT -H "Content-Type: application/json" -d '{"name":"test2"}' "http://localhost:5000/api/accounts/"