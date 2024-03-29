const Account = require('./accounts-model')
const db = require('../../data/db-config')
exports.checkAccountPayload = (req, res, next) => {
  console.log('Check account payload middleware')
  if (!req.body.name || !req.body.budget) {
    next({status: 400, message: 'name and budget are required'})
  } else if (typeof(req.body.name) !== 'string') {
    next({status: 400, message: 'name of account must be a string'})
  } else if (req.body.name.trim().length > 100 || req.body.name.trim().length < 3 ){
    next({status: 400, message: 'name of account must be between 3 and 100'})
  } else if (typeof(req.body.budget) !== 'number'){
    next({status: 400, message: 'budget of account must be a number'})
  } else if (req.body.budget > 1000000 || req.body.budget < 0 ){
    next({status: 400, message: 'budget of account is too large or too small'})}
    else {
      next()
    }
}

exports.checkAccountNameUnique = async (req, res, next) => {
console.log('Check Account Name Unique middleware')
  try {
    const existing = await db('accounts').where('name', req.body.name.trim())
    .first()
    if (existing) {next({status: 400, message: 'that name is taken'})}
    else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
console.log('Check Account ID middleware')
try {
  const account = await Account.getById(req.params.id)
  if (!account) {
    next({status: 404, message: 'not found'})
  } else {
    console.log('account => ', account)
    req.account = account
    next()
  }
} catch (err) {
  next(err)
}
}
