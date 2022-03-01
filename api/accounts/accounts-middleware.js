// Bring in Model
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  // console.log('checkAccountPayload middleware')
  // next()

  //   - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:
  //  - If either name or budget are undefined, return `{ message: "name and budget are required" }`
  //  - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
  //  - If budget is not able to be converted into a number, return `{ message: "budget of account must be a number" }`
  // - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`

  const error = { status: 400 }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
    next(error)
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)
  }

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountNameUnique middleware')
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'not found' })
    } else {
      req.account = account
      next()
    }
  } catch(err) {
    next(err)
  }
}
