const db = require("../../data/db-config.js")

 const getAll = () => {
  return db("accounts")
}

 const getById = id => {
  return db("accounts").where("id",id).first()  
}

 const create = async function (account){
  const [id] = await db("accounts").insert(account)
  return getById(id)
}

 const updateById = async function (id, account){
  await db("accounts").where("id",id).update(account)
  return getById(id)
}

 const deleteById = async function (id){
  const deletedAccount = await getById(id)
  await db("accounts").where("id",id).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
