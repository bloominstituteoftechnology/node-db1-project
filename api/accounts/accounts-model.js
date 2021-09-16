const db = require('../../data/db-config');


const getAll = () => {
  return db('accounts')
}

const getById = id => {
return  db('accounts').where('id', id)
}

const create = account => {
   db('accounts').insert(account)
}

const updateById = (id, account) => {
  db('accounts').where('id', id).update(account)
}

const deleteById = id => {
  db('accounts').where('id', id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
