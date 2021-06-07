const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const error = {status: 400};
  const {name, budget} = req.body;
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
    next(error)
  } //end of id
  else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)
  }//end of else if
   else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
    next(error)
  } //end of else if
  else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
    next(error)
  } //end of else if
  else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
  } //end of else if
  else {
    next()
  }// end of else
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name).first()
    if (existing === req.body.name) {
      next({status: 400, message: 'that name is taken'})
    }//end of if
     else {
      next()
    }//end of else
  }//end of try
   catch (error) {
    next(error)
  }//end of catch
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
     if (!account) {
       next({status: 404, message: 'account not found'})
     } //end of if
     else {
       req.account = account
       next()
     }//end of else
  } //end of try
  catch (err) {
    next(err)
  }//end of catch
}