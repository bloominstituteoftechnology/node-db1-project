 const Account = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
  
  console.log('checkAccountPayLoad middleware')
  next()
  
}

exports.checkAccountNameUnique = (req, res, next) => {
  
  console.log('checkAccountNameUnique middleware')
  next()
  
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'not found'})
    } else {
      req.account = account
      next()
    }
  }
  
  next()
}
