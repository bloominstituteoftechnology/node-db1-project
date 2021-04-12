const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body
  if (name && budget){
    next()
  }else{
    res.status(404).json({message:'name and budget are required'})
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC

}

 exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Accounts.getById(req.params.id)
    if(account){
      req.account = account
      next()
    }else{
      res.status(404).json({message: 'Account not found'})
    }
  } catch(err){
    next(err)
  }
}

  

