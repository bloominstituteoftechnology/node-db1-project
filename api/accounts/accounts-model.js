const db = require("../data/dbConfig");

const getAll = () => {
  return db("accounts");
}

const getById = id => {
  if (id) {
    return db("accounts")
    .where('id', id)
    .first();
  }
}

const create = async account => {
  // DO YOUR MAGIC
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
