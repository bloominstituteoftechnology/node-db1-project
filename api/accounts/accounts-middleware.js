const accounts = require("../accounts/accounts-model")

exports.checkAccountPayload = () => {
  return (req, res, next) => {
    if(!req.body.name || !req.body.budget){
      return res.status(400).json({
        message: "name and budget are required"
      })
    } else if(typeof req.body.name !== "string") {
        return res.status(400).json({
        message: "name of account must be a string"
        })
    } else if(req.body.name.trim() < 3 || req.body.name.trim() > 100) { 
        return res.status(400).json({
        message: "name of account must be between 3 and 100"
        })
    } else if(typeof req.body.budget !== "number") {
        return res.status(400).json({
          message: "budget of account must be a number"
        })
    } else if(req.body.budget < 0 || req.body.budget > 1000000) {
      return res.status(400).json({
        message: "budget of account is too large or too small"
      })
    }

    next()
  }
}

exports.checkAccountNameUnique = () => {
  return (req, res, next) => {
    accounts.getAll()
      .then(accounts => {
        if(accounts.find({
          username: req.body.name.trim()
        })) {
          return res.status(400).json({
          message: "that name is taken"
          })
        }

        next()
      })
    }
}

exports.checkAccountId = () => {
  return (req, res, next) => {
    accounts.getById(req.params.id)
    .then(account => {
      if(account) {
        req.account = account
        next()
    } else {
        res.status(404).json({
          message: "account not found"
        })
      }
   })

    .catch(next)
  }
}
