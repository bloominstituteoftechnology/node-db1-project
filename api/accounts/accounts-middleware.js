const Accounts = require("../accounts/accounts-model")
const db = require("../../data/db-config")

exports.checkAccountPayload = (req, res, next) => {
  const name = req.body.name
  const budget = req.body.budget

  if (!name || !budget) {
    res.status(206).json({message: "name and budget are required"})
  } else if(name.trim().length < 3 || name.trim().length > 100) {
    res.tatus(400).json({message: "name of account must be between 3 and 100"})
  } else if (typeof budget !== "number") {
    res.status(400).json({message: "budget must be a number"})
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({message: "budget of account is too large or too small"})
  } else {
    req.body.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const uniqueAccount = await db('account').where("name", req.body.name.trim).first()
  if (!uniqueAccount) {
    res.tatus(400).json({message: "that name is taken"})
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const { id } = req.params
    const account = await Accounts.getById(id)
    if (!account) {
      res.status(404).json({message: `account with id ${id} does not exist`})
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}
