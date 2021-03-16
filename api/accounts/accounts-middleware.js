const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name,budget} = req.body;
  if (!req.body) {
    res.status(400)
  } else if (!name | !budget){
    res.status(400).json({message:"name and budget are required" })
  } else if (typeof name === 'string') {
    res.status(400).json({message: "name of account must be between 3 and 100" })
  } else if (typeof budget === 'number') {
    res.status(400).json({message: "budget of account must be a number"})
  } else (budget < 0 || budget > 1000000) {
    res.status(400).json({message: "budget of account is too large or too small"})
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    Accounts.getByName(req.body.name)
      .then(account => {
        next()
      })
  } catch (err) {
    res.status(400).json({message: "that name is taken"})
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    Accounts.getById(req.params.id)
      .then(account => {
        next()
      })
  } catch (err) {
    res.status(404).json({message:"account not found" })
    next(err)
  }
}
