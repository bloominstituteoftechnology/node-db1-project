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
  db.select("*").from("Accounts") // "accounts" if returns null
}

const getById = id => {
  db.select("*").from("Accounts").where(id)
}

const create = async account => {
  db("Accounts").insert(account)
}

const updateById = async (id, account) => {
  db("Accounts").where(id).insert(account)
}

const deleteById = async id => {
  db("Accounts").where(id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
