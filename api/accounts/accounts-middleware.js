const Accounts = require('../accounts/accounts-model')
const db = require('../../data/db-config');


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = { status: 400 }
  const {name, budget} = req.body
  if(!name || !budget){
    res.status(400).json({
      message: 'name and budget required'
    })
    next(error)
  } else if (typeof name !== 'string'){
   res.status(400).json({
     message: 'Name must be a string'
   })
   next(error)
  } else if (name.trim().length < 3 || name.trim().length > 36){
    res.status(400).json({
      message: 'Name must be between 3 and 36'
    })
    next(error)
  } else if (typeof budget !== 'number' || isNaN(budget)){
    res.status(400).json({
      message: 'Budget is not a number'
    })
    next(error)
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({
      message: 'budget is less than 0 or more than 1 million'
    })
    next(error)
  } if (res.status(400).message){
    next(error)
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  //SQL constraints make this impossible anyways right?
  try {
    const exist = await db('accounts')
    .where('name', req.body.name.trim())
    .first()
    if (exist) {
      next({status : 400, message: 'That name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getById(req.params.id)
    if(!account){
      res.status(404).json({
        message: `account with id ${req.params.id} doesn't exist`
      })
    } else {
      req.account = account;
      next()
    }
  }catch (err){
    next(err)
  }
}
