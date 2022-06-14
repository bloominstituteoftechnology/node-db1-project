// Bring in Model
const Account = require('./accounts-model')
// Bringing in this idk why
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  // console.log('checkAccountPayload middleware')
  // next()

  //   - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:
  //  - If either name or budget are undefined, return `{ message: "name and budget are required" }` - ok
  //  - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }` - ok
  //  - If budget is not able to be converted into a number, return `{ message: "budget of account must be a number" }` - ok
  // - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }` - ok

  // const error = { status: 400 }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    return res.status(400).json({message: 'name and budget are required'})
   } else if (name.trim().length < 3 || name.trim().length > 100) {
   return res.status(400).json({message: 'name of account must be between 3 and 100'})
   } else if (typeof budget !== 'number' || isNaN(budget )) { 
     return res.status(400).json({message:'budget of account must be a number' })
   
  } else if (budget < 0 || budget > 1000) {
    return res.status(400).json({message:'budget of account is too large or too small' })
  }
    next()

}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  //console.log('checkAccountNameUnique middleware')
  //next()

  // returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
  try {
    const existing = await db('accounts')
    .where('name', req.body.name.trim())
    .first()

    if (existing) {
      next({ status: 400, messae: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'account not found' })
    } else {
      req.account = account
      next()
    }
  } catch(err) {
    next(err)
  }
}
