const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  console.log('checkAccountPayload md');
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  console.log('checkAccountUnique md');
  next()
}

exports.checkAccountId = (req, res, next) => {
  console.log('checkAccountId md');
  next()
} 
