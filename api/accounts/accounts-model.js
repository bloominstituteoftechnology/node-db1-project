const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC

  // select * from accounts;
  return db ('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  // select * from accounts where id =1 //see knex documentation
  return db('accounts').where("id", id).first() //undefined if no id
}

const create = async account => {
  // insert into accounts (name, budget) values ('foo', 1000)
  const [id] = await db('accounts').insert(account, ('id')) //insert returns collection with ids of inserted records
  return getById(id)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).del()
  // delete from accounts where id = 1
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
