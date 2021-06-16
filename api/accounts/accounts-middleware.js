const Account = require("./accounts-model.js");

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body
  if(name && budget){
    next()
  } else {
    res.status(400).json("Name and budget are required.")
  }
}



const checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    } else {
      res.status(404).json("Account not found!")
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
checkAccountId,
checkAccountPayload
}