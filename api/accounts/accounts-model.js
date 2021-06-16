const db = require("../../data/db-config.js");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  // select * from accounts where id = (some#)
  return db("accounts").where("id", id).first();
};

const create = async ({ name, budget }) => {
  // generate id in db
  // insert into accounts(name, budget)
  // return id
  const [id] = await db("accounts").insert({ name, budget });
  return getById(id);
};

const updateById = async (id, { name, budget }) => {
  // grab id from db
  // update name and budget if "id"=id
  // return updated id
  await db("accounts").where("id", id).update({ name, budget });
  return getById(id);
};

const deleteById = async (id) => {
  // grab account from db by id
  // delete account if "id"=id
  // return deleted account
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
