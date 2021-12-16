//const db = require('../../data/db-config');
const Account = require('../accounts/accounts-model.js');
const db = require('../../data/db-config');

//find bug, cant start debugger

exports.checkAccountPayload = (req, res, next) => {
  const error = {status: 400}
  
  //const {name, budget} = req.body;
  const name = req.body.name
  const budget = req.body.budget

 // if (!name || !budget || name === undefined || budget === undefined) {
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required' //Missing name or budget'
    //next(error)
  
  
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    //next(error)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
      error.message = 'name of account must be between 3 and 100 characters'
    //next(error)
    //when checking type in budget:= not budget =
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
    console.log(budget)
    //next(error)
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    //next(error)
  } if (error.message) {
    next(error)
  } else {
    next()
  }
} 

exports.checkAccountNameUnique = async (req, res, next) => {
    try {
      const existing = await db('accounts')
        .where('name', req.body.name.trim())
        .first()

    if (existing) {
      const error = {status: 400}
      error.message = 'that name is taken'
      next(error)
      // next({status: 400, message: "that name is taken"})
    } 
    
    else {
      next()
    }

  } catch (error) {
    next(error)
  }
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
  } catch (error) {
    next(error)
    }
}
