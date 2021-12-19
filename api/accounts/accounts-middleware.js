// Bring in accounts-model
const Account = require('./accounts-model')
const db = require('../../data/db-config')

// This api is not working correctly?????
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  // console.log('checkAccountPayload middleware')
  const error = { status: 400 }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined){
    error.message = 'name and budget are required'

  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'

  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
  
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
  
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
 
  }

  if (error.message) {
    next(error)
  } else {
    next()
  }
    
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  //console.log('checkAccountPayload middleware')
  try {
    const existing = await db('accounts').where('name', req.body.name.trim()).first()
    if (existing) {
      next({ status: 400, message: 'that name is taken' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  //console.log('checkAccountPayload middleware')
  try{
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({ status: 404, message: 'not found'})
    }else{
      req.account = account
      next()
    }
  }catch(err){
    next(err)
  }
  
}
