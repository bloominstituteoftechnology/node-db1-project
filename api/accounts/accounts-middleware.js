const db = require('../../data/db-config')
const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const err = {status: 400}
  const name = req.body.name
  const budget = req.body.budget
  if(name === undefined || budget === undefined){
    res.status(400).json({message: 'name and budget are required'})
    next(err)
  }else if(typeof name !== 'string'){ 
    res.status(400).json({message: 'name of account must be a string'})
  }else if(name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({message: 'name of account must be between 3 and 100'})
  }else if(typeof budget !== 'number' || isNaN(budget)){
    res.status(400).json({message: 'budget of account must be a number'})
  }else if(budget < 0 || budget > 1000000){
    res.status(400).json({message: 'budget on account is too large or too small'})
  }if(err.message){
    next(err)
  }else{
    req.body.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const existing = await db('accounts').where('name', req.body.name.trim())
    .first()
    if(existing){
      next(res.status(400).json({message: 'that name is taken'}))
    }else{
      next()
    }
  }catch(err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Accounts.getById(req.params.id)
    if(!account){
      next({status: 404, message: 'account not found'})
    }else{
      req.account = account
      next()
    }
  }catch(err){
    next(err)
  }
}