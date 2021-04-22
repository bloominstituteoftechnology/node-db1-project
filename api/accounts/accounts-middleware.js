const db = require("./accounts-model")

function checkAccountPayload() {
  // DO YOUR MAGIC
  return (req, res, next) => {
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
     return res.status(400).json({message: "budget of account is too large or too small"})
  }}
    
}  

/* exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const allAccounts = await db.getAll()
    allAccounts.filter(account => {
      if (account.name === req.body.name) {
        res.status(400).json({message: "that name is taken"})
      } else {
        return account
      }

    } catch(err) {
      console.log(err)
    
}
 */

function checkAccountId() { 
  return (req, res, next) => {
  db.getById(req.params.id)
    .then((account) => {
      if (!account) {
        res.status(400).json({message: "account not found"})
    } else {
        req.account = account
          next()
    }
    })
    .catch((error) => {
      next(error)
    })
  }
}    

module.exports = {checkAccountPayload, checkAccountId}