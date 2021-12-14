const db = require ('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  // SELECT * from accounts;
  return db('accounts');

}

const getById = id => {
  // DO YOUR MAGIC
  // SELECT * from accounts where id = 1;
  return db('accounts').where('id', id).first();
}

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
