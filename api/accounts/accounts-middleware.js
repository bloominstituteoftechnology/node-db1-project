// Bring in accounts-model
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  console.log('checkAccountPayload middleware')
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountPayload middleware')
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  //console.log('checkAccountPayload middleware')
  try{
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({ status: 404, message: 'not found'})
    }else{
      req.account = account
      next()
    }
  }catch(err){
    next(err)
  }
  
}
