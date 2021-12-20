const db = require("../../data/db-config")

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts").where("id", id).first()
}

const create = account => {
  const [id] = db("accounts").insert(account)
  return getById(id)
}

const updateById = (id, account) => {
  const [updatedId] = db("accounts").where("id", id).update(account)
  return getById(updatedId)
}

const deleteById = id => {
  const [DeleteId] = db("accounts").where("id", id).del()
  return DeleteId
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
