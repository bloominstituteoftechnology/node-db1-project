const db = require('../../data/db-config')
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const {name, budget} = req.body

    if(!name||!budget){
      res.status(400).json({message: 'name and budget are required'})
    } else if (typeof name != 'string') {
      res.status(400).json({message: 'name od account must be a string'})
    } else if (name.trim().lenght < 3 || name.trim().length >100) {
      res.status(400).json({message:'name of account must me more than 3 but less than a 100'})
    } else if (typeof budget != 'number') {
      res.status(400).json({message: 'budget of account must me a number'})
    } else if (budget < 0 ) {
      res.status(400).json({message: ' budget of account is too small'})
    }
    else {
      next()
    } 
}catch(err){
      next(err)
    }
  }

exports.checkAccountNameUnique =  async(req, res, next) => {
  // DO YOUR MAGIC
  try{ 
    const {name} = req.body
    const taken = await db('accounts')
    .where('name', name.trim())
    .frist()

    if(taken){
      res.status(400).json({message:'that name s taken'})
    } else {
      next()
    }

  }catch(err){
    next(err)
  }

}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    }else{res.json(400).json({message: 'account not found'})}

  }catch(err){
    next(err)
  }

}
