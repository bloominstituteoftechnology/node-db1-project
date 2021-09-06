const db = require("../../data/db-config.js");
const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id);
};

const getByName = (name) => {
  return db("accounts").where("name", name);
};

const create = async ({ name, budget }) => {
  const newId = await db("accounts").insert({ name, budget });
  return getById(newId);
};

const updateById = async (id, account) => {
  const updatedId = await db("accounts").where("id", id).update(account);
  return getById(updatedId);
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};
