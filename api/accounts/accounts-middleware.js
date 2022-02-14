const db = require('../../data/db-config')
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 }
  const { name, budget } = req.body
  if(name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
  } else if (typeof name !== 'string'){
    error.message = 'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'name of account must be a number'
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
  }

  if (error.message){
    next(error)
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const { name } = req.body
    const exists = await db('accounts')
      .where('name', name.trim())
      .first()
      if (exists){
        next({ status: 400, message: 'that name is taken'})
      } else {
        next()
      }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
    const { id } = req.params
    Account.getById(id)
      .then(account => {
          if(!account){ 
            next({
              status: 404,
              message: 'Account Not Found',
            })
          } else { 
            req.account = account
            next()
          }
      })      
} 
