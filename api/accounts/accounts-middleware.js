//const db = require('../../data/db-config');
const Account = require('../accounts/accounts-model.js');

//find bug, cant start debugger

exports.checkAccountPayload = (req, res, next) => {
  const error = {status: 400}
  
  //const {name, budget} = req.body;
  const name = req.body.name
  const budget = req.body.budget

 // if (!name || !budget || name === undefined || budget === undefined) {
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required' //Missing name or budget'
    next(error)
  
  
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
      error.message = 'name of account must be between 3 and 100 characters'
    next(error)
    //when checking type in budget:= not budget =
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
    console.log(budget)
    next(error)
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
  }
} 


exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountNameUnique middleware')
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  // console.log('checkAccountId middleware')
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next ({ status: 404, message: 'Account not found' })
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    next(err)
    }
}
