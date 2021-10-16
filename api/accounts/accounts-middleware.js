const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checking payload')
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: 'name and budget are required' })
  }
  else if (typeof req.body.name != 'string') {
    res.status(400).json({ message: "name of account must be a string" })
  }
  else if (req.body.name.length < 3 || req.body.name.length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }
  else if (typeof req.body.budget != 'number') {
    res.status(400).json({ message: "budget of account must be a number" })
  }
  else if (req.body.budget < 0 || req.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  }

  else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checking if name unique')
  db('accounts').where({ name: req.body.name }).first()
    .then(account => {
      if (!account) {
        next()
      } else {
        res.status(400).json('that name is taken')
      }
    })
    .catch(err => {
      res.json({ message: err.message })
    })
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checking account id')
  const { id } = req.params;
  Account.getById(id)
    .then(account => {
      if (!account) {
        res.status(404).json({ message: "account not found" })
      } else {
        next()
      }
    })
    .catch(err => {
      res.statu(500).json({ message: 'error retrieving from database' })
    })

}
