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

const create = async account => {
  // insert into accounts (name, budget) values ('test', 100);
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {

  // update accounts set name = 'test' where id = 1;
  // const [updated] = await db('accounts')
  // .where('id', id).update(account) //eslint-disable-line
  // return getById(id) 

  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = id => {
  // delete from accounts where id = 1;
  return db ('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
