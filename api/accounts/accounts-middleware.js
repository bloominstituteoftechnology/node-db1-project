const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // console.log('checkAccountPayload md');
  const error = { status: 400 }
  const{ name, budget } = req.body
  if( name === undefined || budget === undefined ) {
    error.message = 'name and budget are required'
    next(error)
  }else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)
  }else if (name.trim().length < 3 || name.trim().length> 100){
    error.message = 'name of account must be between 3 and 100'
    next(error)
  }else if (typeof budget !== 'number' || !isNaN(budget)){
    error.message = 'budget of account must be a number'
    next(error)
  }else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  console.log('checkAccountUnique md');
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // console.log('checkAccountId md');
  try{
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({ 
        status: 404,
        message: 'Account with specified id does not exist'
      })
    }else {
      res.account = account
      next()
    }
  }catch (err){
    next(err)
  }
  
} 
