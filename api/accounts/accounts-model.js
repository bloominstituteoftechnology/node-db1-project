const db = require("../../data/db-config.js");
const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  // DO YOUR MAGIC
  const [id] = await db("accounts").insert(account);
  return getById(id);
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").where("id", id).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const removedAcocunt = getById(id);
  await db("account").where("id", id).del();
  return removedAcocunt;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
