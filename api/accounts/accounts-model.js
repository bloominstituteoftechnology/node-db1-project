const db = require("../../data/db-config.js");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  return getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  const deletedPost = await getById(id);
  await db("accounts").where("id", id).delete();
  return deletedPost;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
