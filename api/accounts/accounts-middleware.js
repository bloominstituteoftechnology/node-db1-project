const db = require('../../data/db-config');
const Accounts = require('./accounts-model.js');

exports.checkAccountPayload = (req, res, next) => {
  try {
    const {name, budget} = req.body;
    
    if ( ! name || ! budget) {
      res.status(400)
        .json({ message: 'name and budget are required' })
    } else if (typeof name != 'string') {
      res.status(400)
        .json({ message: 'name of account must be a string' })
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      res.status(400)
        .json({ message: 'name of account must be between 3 and 100' })
    } else if (typeof budget != 'number') {
      res.status(400)
        .json({ message: 'budget of account must be a number' })
    } else if (budget < 0) {
      res.status(400)
        .json({ message: 'budget of account is too large or too small' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const {name} = req.body
    const taken = await db('accounts')
      .where('name', name.trim())
      .first()
    
    if (taken) {
      res.status(400).json({message: "that name is taken"})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    if(account){
      req.account = account
      next()
    } else {
      res.status(404).json({ message: "account not found" })
    }
  } catch (err) {
    next(err)
  }
}
