const db = require("../../data/db-config.js")




function getAll() {
  return db("accounts")
}

function getById(id){
  return db("accounts").where("id", id).first() //This is saying return the first account we find with the id matching the id passed in as the argument
}

async function create({name, budget}) {
  const [id] = await db("accounts").insert({name, budget})
  return getById(id)
}

async function updateById(id, {name, budget}) {
  await db("accounts").where("id", id).update({name, budget})
  return getById(id)
}

async function deleteById(id) {
  const deletedAcct = await getById(id)
  await db("accounts").where("id", id).delete()
  return deletedAcct
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
