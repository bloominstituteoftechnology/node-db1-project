const db = require("../data/dbConfig");

const getAll = () => {
  return db("accounts");
}

const getById = async id => {
  if (id) {
    return await db("accounts")
    .where('id', id)
    .first();
  }
}

const create = async account => {
  if (account){
    return await db("accounts")
    .insert(account)
    .then(([id]) => getById(id) );
  }
}

const updateById = async (id, changes) => {
  if(id){
    return await db("accounts").where({id}).update(changes)
  }
}
//this is kind of like a state update formula

const deleteById = async id => {
  return await db("accounts").del().where({id})
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
