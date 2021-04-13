const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
  
}

const getById = id => {
  // DO YOUR MAGIC
  // db('table name').where('column', var)
  // select(table) where column = condition
  return db('accounts').where('id',id)
  
}

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  return getById(id)
  
 

}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  // start by isolating the row you want to update
  // db(table).where(column, conditionVar).update({key:value})
  await db('accounts').where('id',id).update(account)
  return getById(id)
   
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const deleted = getById(id)
  await db('accounts').where('id',id).delete()
  return deleted
  // return {
  //  newData: getAll(),
  //  deleted: deleted }
 
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
