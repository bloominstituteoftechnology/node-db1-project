
const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const body = req.body;
  const {name, budget} = req.body
  console.log("in the checkAccountPayload")
  console.log("name", name)
  console.log("budget", budget)
  if(name && budget) {
    
    next()
  }else{
    res.status(400).json("name and budget required")
  }
}


exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
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

