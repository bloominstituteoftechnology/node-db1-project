const db=require('../../data/db-config')


const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts")
  }

const getById =(id)=> {
  // DO YOUR MAGIC
  
return db("accounts")
  .where("id",id)
  .first()

  
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
