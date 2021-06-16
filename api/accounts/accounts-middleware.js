exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {title, contents} = req.body
  if(title && contents) {
    next()
  }else{
    res.status(400).json("title and contents required")
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    } else {
      res.status(404).json("Account not found")
    }
  } catch (err) {
    next(err)
  }
}
