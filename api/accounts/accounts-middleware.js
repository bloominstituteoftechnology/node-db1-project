const Account = require("./accounts-model.js");

exports.checkAccountPayload = (req, res, next) => {
  let {name, budget} = req.body
  let trimmedName = undefined;

  if (name && typeof name === "string") {
    trimmedName = name.trim()
  }
  if (typeof name === "undefined" || typeof budget === "undefined") {  
    res.status(400).json({ message: "name and budget are required"})

  } else if (typeof budget !== "number" || Number.isNaN(budget)) {
    res.status(400).json({ message: "budget must be a number" })  

  } else if (budget < 0 || budget > 1000000) {
    return res.status(400).json({ message: "budget of account is too large or too small" });

  } else if (typeof name !== "string") {
      res.status(400).json({ message: "name must be a string" })

  } else if (trimmedName.length < 3 || trimmedName.length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100 characters long" })

  } else {
    const account = {
      name: trimmedName,
      budget: budget
    }
    req.account = account;
    next();
  }

}
exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC;
  let newAccountName = req.body.name
  newAccountName = newAccountName.trim().toLowerCase()

  Account.getAll()
  .then((accounts) => {
    const existingAccountName = accounts.find((account) => {
      return account.name.trim().toLowerCase() === newAccountName
    })

    if(existingAccountName) {
      return res.status(400).json({ message: "Sorry that account name is taken :(" })
    } else {
      next()
    }
  })
  .catch((error) => {
    next(error)
  })
}
exports.checkAccountId = async (req, res, next) => {

  try{
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    } else {
      res.status(404).json({message:"account not found"})
    }
  } catch (err) {
    next(err)
  }
}