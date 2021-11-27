const db = require('../../data/db-config')

const getAll = () => {
  //select * from accounts
  return db('accounts')
}

const getById = async (id) => {
  //select * from accounts where id = 1
  return db('accounts').where('id', id).first()
  
}

const create = async (account) => {
  // DO YOUR MAGIC
  
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
   
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
