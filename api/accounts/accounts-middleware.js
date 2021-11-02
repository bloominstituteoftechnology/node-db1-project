const Accounts = require('./accounts-model')

function checkAccountPayload (req, res, next) {
  let { name, budget } = req.body;
  // name = name.trim
  
  if (!req.body || !name || !budget) {
    res.status(400).json({ message: 'name and budget are required' })
  }
  else if (typeof(name) != 'string') {
    res.status(400).json({ message: "name of account must be a string" })
  }
  else if (name.length < 3 || name.length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }
  else if (typeof(budget) != 'number') {
    res.status(400).json({ message: "budget of account must be a number" })
  }
  else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  }
  
  else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
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

module.exports = {checkAccountId, checkAccountPayload }