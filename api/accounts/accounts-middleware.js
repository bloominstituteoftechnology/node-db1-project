const Account = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  const err = {status: 400}
  if(name === undefined || budget === undefined){
    err.message = "name and budget are required"
  }else if(typeof name !== "string"){
    err.message = "name of account must be a string"
  }else if(name.trim().length < 3 || name.trim().length > 100){
    err.message = "name of account must be between 3 and 100"
  }else if(typeof budget !== "number" || isNaN(budget)){
    err.message = "budget of account must be a number"
  }else if(budget < 0 || budget > 1000000){
    err.message = "budget of account is too large or too small"
  }
  if(err.message){
    next(err)
  }else{
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  try{
    next()
  }catch(err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id)
    if(!account){
      next({status: 404, message: "account not found"})
    }else{
      req.account = account
      next()
    }
  }catch(err){
    next(err)
  }
}
