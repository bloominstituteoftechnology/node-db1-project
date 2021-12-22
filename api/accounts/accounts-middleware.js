const Accounts = require("../accounts/accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
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
