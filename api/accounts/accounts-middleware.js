const model = require("./accounts-model")
const db = require("../../data/db-config")

exports.checkAccountPayload = () => (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name || !req.body.name) {
    res.status(400).json({
      message: "Name and Budget are required fields"
    })
  }

  else if(req.body.name.length <3 || req.body.name.length > 12) {
    res.status(400).json({
      message: "Name must be between 3 and 12 characters"
    })
  }

  else if(typeof req.body.name !== "string") {
    res.status(400).json({
      message: "Name must be a string"
    })
  }

  else if(typeof budget !== "number"){
    res.status(400).json({
      message: "Budget must be a number"
    })
  }

  next();
}

exports.checkAccountNameUnique = () => async (req, res, next) => {
  // DO YOUR MAGIC
  const accountsList = await model.getAll()
  const checkAccountsList = accountsList.filter(account => account.name === req.body.name)

  if (checkAccountsList.name === req.body.name){
    res.status(400).json({
      message: "Account name is not available"
    })
  } else {
    next()
  }
}

exports.checkAccountId = () => async (req, res, next) => {
  // DO YOUR MAGIC

  const account = req.accounts.map(item => account.id == req.params.id)

  if (!account) {
    res.status(400).json({
      message: "Account not found"
    })
  } else {
    req.accountInfo = account
    next()
  }
}
