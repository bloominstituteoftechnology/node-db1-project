const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts")
}

const getById = id => {
  // DO YOUR MAGIC
  return db("accounts").where("id", id).first();
}

const create = async account => {
  // DO YOUR MAGIC
  return db("accounts")
    .insert(account)
    .then(([id]) => {
      return db("accounts").where("id", id).first();
    })
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  const POSTID = id
  return db("accounts")
    .where("id", id)
    .update(account)
    .then(() => {
      return db("accounts").where("id", POSTID).first()
    })
  }

const deleteById = id => {
  // DO YOUR MAGIC
  return db("accounts")
    .where("id", id)
    .del()
    .then(() => {
      return db("accounts")
    })
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
