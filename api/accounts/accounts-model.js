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

function getAll(){
  return db('accounts')
}

function getById(id){
  return db('accounts')
    .where({ id })
    .first()
} 

function getByName(name){
  return db('accounts')
    .where({ name })
}

function create(account){
  return db('accounts')
    .insert(account)
    .then( ids => {
      return getById(ids[0])
    })
}

function updateById(id, updatedAccount){
  return db('accounts')
    .where({ id })
    .update(updatedAccount)
    .then( () => {
      return getById(id)
    })
}

function deleteById(id){
  return db('accounts')
    .where({ id })
    .del()
}
