const Accounts = require('./accounts-model')
const ExpressError = require('../expressError')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const body = req.body

  if (body.name) {
    body.name = body.name.trim()
  }
  if (!body.name && !body.budget) {
    console.log('checks for body')
    res.status(400).json({ message: "name and budget are required" })
    }
    else if (typeof body.name !== "string") {
      console.log('checks for string')
      res.status(400).json({ message: "name of account must be a string" })
    } 
    else if (body.name.length < 3 || body.name.length > 100) {
      // next(new ExpressError("name of account must be between 3 and 100", 400));
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    }
     else if (typeof body.budget !== "number") {
      res.status(400).json({ message: "budget of account must be a number" })
    } 
    else if (body.budget < 0 || body.budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" })
    }
     else {
       console.log('checkPayload works')
      next();
    }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const name = await Accounts.getByName(req.body.name)
    if (name) {
      next()
      } else {
        next(new ExpressError("that name is taken", 400));
        }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const accountId = await Accounts.getById(req.params.id);
    if (accountId) {
      req.account = accountId
      console.log('checkId works')
      next()
    } else {
      next(new ExpressError("account not found", 404));
    }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
  // DO YOUR MAGIC
}
