const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 }
  const{ name, budget } = req.body
  if( name === undefined || budget === undefined ) {
    error.message = 'name and budget are required'
  }else if (name.trim().length < 3 || name.trim().length > 100){
    error.message = 'name of account must be between 3 and 100'
  }else if (typeof budget !== 'number' || !isNaN(budget)){
    error.message = 'budget of account must be a number'
  }else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
  }
  if(error.message){
    next(error)
  }else{
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const existing = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
      if(!existing){
        res.status(400).json({
          message: 'that name is taken'
        })
      }
  }catch(err){
    next(err)
  }
}


exports.checkAccountId = (req, res, next) => {
  const { id } = req.params
  Accounts.getById(id)
    .then(account => {
      if(!account){
        res.status(404).json({
          message: 'account not found'
        })
      }else{
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'error retireving from database'
      })
    })
}