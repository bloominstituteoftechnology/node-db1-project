const Account = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
    try {
      const name = req.body.name
      const budget = req.body.budget
      if (!name || !budget) {
        res.status(400).json({ message: 'Required: budget and name' })
      } else if (typeof name !== 'string') {res.status(400).json({ message: 'name of account must be in string format' })
      } else if (typeof budget !== 'number') {res.status(400).json({ message: 'budget must be in number format' })
      } else if (name.trim().length < 3 || name.trim().length > 100) {res.status(400).json({ message: 'account name must be longer than three and less than one hundred characters' })
      } else if (budget < 0 || budget > 1000000) {res.status(400).json({ message: 'amount within account must be greater than zero and less than one million' })
      } else {req.body.name = name.trim() 
        next()
      }
    } catch (err){
        next(err)
    }
  }


exports.checkAccountNameUnique = async (req, res, next) => {
  
    try {
      const currentAccounts = await accounts.getAll()
      const accountName = req.body.name.trim()
      const results = currentAccounts.filter((item) => {
        if (item.accountName === accountName) {
          return item
        }
      })
      if (results.length > 0) {res.status(400).json({ message: 'name already taken' })
    } else {
      next()
    }
  } catch (err){
    next(err)
  }
}


exports.checkAccountId = async (req, res, next) => {
  const {id} = req.params
  const idExists = await Account.getById(id)
  if(idExists){
    next()
  }else{
    res.status(400).json({message:"ID does not exist in Database"})
  }
}