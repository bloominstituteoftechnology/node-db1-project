const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts')
    .where('id', id)
    .first();
}

const create = async account => {
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  await db('accounts')
    .update(account)
    .where('id', id);
  return getById(id);
}

const deleteById = async id => {
  const deletedAccount = await getById(id);
  await db('accounts')
    .where('id', id)
    .delete();
  return deletedAccount;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
