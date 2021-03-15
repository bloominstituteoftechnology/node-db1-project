const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.budget || req.body.name === undefined || req.body.budget === undefined) {
    res.status(400).json({message: 'name and budget are required'})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  if (req.params.name !== undefined){
    res.status(404).json({message: 'that name is taken'})
  } else {
    next()
  }
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    const account = await Accounts.getById(req.params.id)
    if (!account) {
      res.status(404).json({message: 'account not found'})
    } else {
      req.account = account
      next()
    }
  } catch(err) {
    next(err)
  }
}
