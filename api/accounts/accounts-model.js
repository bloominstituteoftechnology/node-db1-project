const db =require('../../data/db-config.js')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db("accounts").where("id",id).first()
}

const create = async account => {
  return db('accounts').insert(account)
  .then(([id]) =>{
    return db('accounts').where('id',id).first()
  })
}

const updateById = async (id, account) => {
  const accountId = id
  return db('accounts').where('id',id).update(account)
  .then(() =>{
    return db('accounts').where('id',accountId).first()
  })
}

const deleteById = async id => {
  return db('accounts').where('id',id).del(id)
  .then(() =>{
    return db('accounts')
  })
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}