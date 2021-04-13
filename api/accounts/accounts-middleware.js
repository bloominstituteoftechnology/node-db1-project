const db = require('../../data/db-config')
const Accounts = require('./accounts-model')



exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name,budget} = req.body
  if(name && budget) {
    next()
  }
  else{
    res.status(400).json('name and budget are required')
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body
  const accountName = await db('accounts').where('name', name)
  if(!accountName){
    next()
  }
  else{
    res.status(400).json('That name already exists')
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  try{
    const account = await Accounts.getById(id)
    if(!account){
      res.status(404).json(`The account with id: ${id} does not exist`)
    }
    else{
      req.account = account
      next()
    }

  }
  catch(err){
    res.status(500).json({message: err.message})
  }
  
}
