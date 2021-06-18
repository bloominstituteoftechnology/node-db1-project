const Accounts = require('./accounts-model')



exports.checkAccountPayload = (req, res, next) => {
const {name, budget} = req.body
if(name && budget){
  next()
} else {
  res.status(400).json({message:  "name and budget are required"})
}
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC

  
}

exports.checkAccountId = (req, res, next) => {
try {
  const accounts = await Accounts.getById(req.param.id)
  if(accounts){
    req.accounts = accounts
    next()
  } else {
    res.status.json({ message: "account not found" })
  }
} catch(err) {
  next (err)
}
}

// export middleware 
// module.export = {
  
// }