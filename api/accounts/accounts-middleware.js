const dbConfig = require('../../data/db-config')
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  try {
    const { name, budget } = req.body
    if (name === undefined || budget === undefined) {
      res.status(400).json({
        message: 'name and budget are required'
      })
    } else if (typeof budget !== 'number' || isNaN(budget)) {
      res.status(400).json({
        message: 'budget of account must be a number'
      })
    } else if (typeof name !== 'string') {
      res.status(400).json({
        message: 'name of account must be a string'
      })
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      res.status(400).json({
        message: 'name of account must be between 3 and 100'
      })
    } 

    else if (req.body.budget < 0 || req.body.budget > 1000000) {
      res.status(400).json({
        message: 'budget of account is too large or too small'
      })
    } else {
      next()
    }
  } catch (err) {
    res.status(201)
    next(err)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existingAccounts = await dbConfig('accounts')
      .where('name', req.body.name.trim())
    .first()
    if (existingAccounts) {
      next({ 
        status: 400,
        message: 'that name is taken'
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Account.getById(req.params.id)
    if (!account) {
        return res.status(404).json({
            message: 'account not found'
        })
    } else {
        next()
    }
}
