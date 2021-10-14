const e = require("express")
const account = require('./accounts-model')
const db = require("../../data/db-config.js")

exports.checkAccountPayload = (req, res, next) => {
  if (!req.body.name || !req.body.budget) {
    res.status(400).json('Name and Budget are required')
  } else if (typeof req.body.name != 'string') {
    res.status(400).json('Name of account must be string')
  } else if (req.body.name.length < 3 || req.body.name.length > 100) {
    res.status(400).json('Name of account must be between 3 and 100')
  } else if (typeof req.body.budget != 'number') {
    res.status(400).json('Budget of account must be a number')
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json('Budget of account is too large or too small')
  } else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  db('budget').where({ name: req.body.name })
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
  const {id} = req.params
  account.getById(id)
    .then(account => {
      if(!account) {
        res.status(404).json('account not found')
      } else {
        next()
      }
    })
    .catch(err => {
      res.json({ message: err.message })
    })
}
