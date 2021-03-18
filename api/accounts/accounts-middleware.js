const accounts = require('./accounts-model')

exports.checkAccountPayload = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
      const name = req.body.name
      const budget = req.body.budget
      if (!name || !budget) {
        res.status(400).json({ message: 'Required: budget and name' })
      } else if (typeof name !== 'string') {res.status(400).json({ message: 'name of account must be in string format' })
      } else if (typeof budget !== 'number') {res.status(400).json({ message: 'budget must be in number format' })
      } else if (name.trim().length < 3 || name.trim().length > 100) {res.status(400).json({ message: 'account name must be longer than three and less than one hundred characters' })
      } else if (budget < 0 || budget > 1000000) {res.status(400).json({ message: 'amount within account must be greater than zero and less than one million' })
      } else {req.body.name = name.trim() 
        next()
      }
    } catch (err){
        next(err)
    }
  }
}

exports.checkAccountNameUnique = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
      const currentAccounts = await accounts.getAll()
      const name = req.body.name.trim()
      const results = currentAccounts.filter((item) => {
        if (item.name === name) {
          return item
        }
      })
      if (results.length > 0) {res.status(400).json({ message: 'name already taken' })
    } else {
      next()
    }
  } catch (err){
    next(err)
  }
}
}

exports.checkAccountId = () => {
  return async (req, res, res) => {
    try {
      const account = await accounts.getById(req.params.id)
        if (account) {
          req.account = account
          next()
        } else {res.status(404).json({ message: 'Account not found' })
      }
    } catch (err){
      next(err)
    }
  }
  // DO YOUR MAGIC
}
