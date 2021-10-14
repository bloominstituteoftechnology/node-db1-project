const Account = require('./accounts-model')
const db = require('../../data/db-config')



exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 }
  const { name, budget } = req.body
  if( name === undefined || budget === undefined ) {
    error.message = 'name and budget are required'
    next(error)
  } else if(typeof name !== 'string') {
    res.status(400).json({ message: 'name of account must be a string'})
  } else if(name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100'})
  } else if(typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({ message: 'budget of account must be a number'})
  } else if(budget < 0 || budget > 1000000) {
    res.status(400).json({ message: 'budget of account is too large or too small'})
  } 

  if (error.message) {
    next(error)
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const takenName = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
    if (takenName) {
      next( { status: 400, message: 'that name is taken '})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({ status: 404, message: 'account not found'})
    } else {
      req.account = account
      next()    }
  } catch (err) {
    next(err)
  }
}