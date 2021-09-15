const Account = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('test 1')
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('test 2')
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  //console.log('test 3')
  try{
    const account = await Account.getById(req.params.id) //accountId
    if (!account) {
      next({status: 404, message: 'account not found'})
    } else {
      req.account = account
      next()
    }
  } catch(err){
    next()
  }
}