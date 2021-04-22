const db = require("../../data/db-config")


const getAll = () => {
  // DO YOUR MAGIC
  db.select("*")
}

const getById = id => {
  // DO YOUR MAGIC
  db.select("*").from("accounts").where(id)
}

const create = async account => {
  // DO YOUR MAGIC
  await db("accounts").insert(account)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").update(account).where(id)
}

const deleteById = async id => {
  // DO YOUR MAGIC
  await db("accounts").where(id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
