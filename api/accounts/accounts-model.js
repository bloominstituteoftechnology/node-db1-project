const { where } = require('../../data/db-config')
const db = require('../../data/db-config')

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts')
    .where({ id })
    .first()
} 

const getByName = name => {
  return db('accounts')
    .where({ name })
}

const create = account => {
  return db('accounts')
    .insert(account)
    .then( ids => {
      return getById(ids[0])
    })
}

const updateById = (id, updatedAccount) => {
  return db('accounts')
    .where({ id })
    .update(updatedAccount)
    .then( () => {
      return getById(id)
    })
}

const deleteById = id => {
  return db('accounts')
    .where({ id })
    .del()
}
