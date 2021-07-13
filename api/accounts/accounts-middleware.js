const Account = require('./accounts-model')


const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body

  // should use an object check for budget. Not checking for falses
  if (!req.body.name || !('budget' in req.body)) {
    res.status(400).json({ message: 'name and budget are required' })
  }
  else if (typeof(req.body.name) != 'string') {
    res.status(400).json({ message: 'name of account must be a string' })
  }
  else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100' })
  }
  else if (typeof(req.body.budget) !== 'number' || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" })
  }
  else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  }
  else {
    req.account = { name: name.trim(), budget: budget }
    next()
  }
}

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
  .then(accounts => {
    if (accounts.filter(account => account.name == req.body.name).length > 0) {
      next({
        message: 'that name is taken',
        status: 400
      })
    }
    else {
      next()
    }
  })
}

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
  .then(account => {
    if (!account) {
      res.status(404).json({ message: 'account not found' })
    }
    else {
      req.account = account
      next()
    }
  })
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
}