const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if(name === undefined || budget === undefined){
    res.status(400).json({message: 'name and budget are required'})
  }
  else if(!name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({message: 'name of account must be between 3 and 100'})
  }
  else if(typeof budget !== 'number' || NaN(budget)){
    res.status(400).json({message: 'budget of account must be a number'})
  }
  else if(budget < 0 || budget > 1000000){
    res.status(400).json({message: 'budget of account is too large or too small'})
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  
}

exports.checkAccountId = (req, res, next) => {
  const account = Accounts.getById(req.params.id)
  if(!account){
    res.status(404).json({message: 'that name is taken'})
  }else{
    req.account = account
    next()
  }
}
