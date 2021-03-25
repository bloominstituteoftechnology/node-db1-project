const Accounts = require('./accounts-model')
const ExpressError = require('../expressError')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const body = req.body
    if (!body.name) {
      res.status(400).json({ message: "name is required" })
      // const err = new ExpressError("name and budget are required", 400);
      // next(err);
    } else if (!body.budget) {
      res.status(400).json({ message: "budget is required" })
    }
    else if (typeof body.name !== "string") {
      res.status(400).json({ message: "name of account must be a string" })
    } else if (body.name.length < 3 && body.name.length > 100) {
      // next(new ExpressError("name of account must be between 3 and 100", 400));
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    } else if (typeof body.budget !== "number") {
      res.status(400).json({ message: "budget of account must be a number" })
    } else if (body.budget < 0 && body.budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" })
    } else {
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
      next()
    } else {
      next(new ExpressError("account not found", 404));
    }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
  // DO YOUR MAGIC
}
