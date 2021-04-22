const db = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const name = req.body.name
    const budget = req.body.budget

  if (!name || !budget) {
      res.status(400).json({message: "name and budget are requried"})
  } else if (typeof name !== 'string') {
      res.status(400).json({message: "name of account must be a string"})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
      res.status(400).json({message: "name of account must be between 3 and 100"})
  } else if (typeof budget !== 'number') {
      res.status(400).json({message: "budget of account must be a number"})
  } else if (budget < 0 || budget > 1000000) {
      res.status(400).json({message: "budget of account is too large or too small"})
  } else {
    next()
  }

} catch(err) {
    next(err)
  } 
}

/* exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const allAccounts = await db.getAll()
    allAccounts.filter(account => {
      if (account.name === req.body.name) {
        res.status(400).json({message: "that name is taken"})
      } else {
        next()
      }

    } catch(err) {
      next(err)
    
}
 */

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC  
  try {
    const isValid = await db.getById(req.params.id)
      if (!isValid) {
        res.status(400).json({message: "account not found"})
      } else {
        next()
      }

    } catch(err) {
      next(err)
    }
}