const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

function checkAccountPayload (req, res, next) {
  let { name, budget } = req.body;
  // name = name.trim();
  
  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: 'name and budget are required' })
  }
  else if (typeof(name) != 'string') {
    res.status(400).json({ message: "name of account must be a string" })
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }
  else if (typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" })
  }
  else if (budget <= 1 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  }
  
  else {
    next()
  }
}

function checkAccountNameUnique (req, res, next) {
  db('accounts').where({ name: req.body.name }).first()
    .then(account => {
      if (!account) {
        next()
      } else {
        res.status(400).json({ message: "that name is taken" })
      }
    })
    .catch(next)
}

function checkAccountId(req, res, next) {
  const { id } = req.params
  Accounts.getById(id).then(account => {
    if (account) {
      req.verified = account
      next()
    } else {
      res.status(404).json({message: "account not found"})
    }
  })
  
}

module.exports = { checkAccountId, checkAccountPayload, checkAccountNameUnique }