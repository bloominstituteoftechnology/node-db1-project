const Account = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  try{
    next()
  }catch(err){
    next(err)
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
