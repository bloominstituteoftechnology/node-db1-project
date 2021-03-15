const knex = require("knex")

const config = {
  client: "sqlite3",
  connection: {
    filename: "./data/budget.db3"
  },
  useNullAsDefault: "true"
}

const db = knex(config)

const getAll = () => {
  db.select("*")
}

const getById = id => {
  db.select("*").from("accounts").where(id)
}

const create = async account => {
  await db("accounts").insert(account)
}

const updateById = async (id, account) => {
  await db("accounts").where(id).update(account)
}

const deleteById = async id => {
  await db("accounts").where(id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
