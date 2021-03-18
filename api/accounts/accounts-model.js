const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
  // DO YOUR MAGIC
}

const getById = id => {
  if (id) {
    return db('accounts')
      .where('id', id)
      .first()
  }
  // DO YOUR MAGIC
}

const create = account => {
  if (account) {
    return db('accounts')
      .insert(account)
      .then(([id]) => getById(id))
  }
  // DO YOUR MAGIC
}

const updateById = (id, changes) => {
  if (id) {
    return db('accounts')
      .where('id', id)
      .update(changes)
      .then((count) => (count > 0 ? getById(id) : null))
  }
  // DO YOUR MAGIC
}

const deleteById = id => {
  if (id) {
    return db('accounts')
    .where('id', id)
    .del()
  }
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
