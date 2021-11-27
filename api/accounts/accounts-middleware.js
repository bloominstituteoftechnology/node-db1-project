const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  console.log('checkAccountPayload md');
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  console.log('checkAccountUnique md');
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // console.log('checkAccountId md');
  try{
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({ 
        status: 404,
        message: 'Account with specified id does not exist'
      })
    }else {
      res.account = account
      next()
    }
  }catch (err){
    next(err)
  }
  
} 
