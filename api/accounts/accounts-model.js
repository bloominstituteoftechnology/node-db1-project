const getAll = () => {
  return db ('accounts')
  // DO YOUR MAGIC
}

const getById = id => {
  if 9id
 {
   return db ('accounts')
   .where ('id', id)
   .first()
 }  // DO YOUR MAGIC
}

const create = async account => {
  
  // DO YOUR MAGIC
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
