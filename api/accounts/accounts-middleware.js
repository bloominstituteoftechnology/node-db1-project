const { getById, getByName } = require('./accounts-model.js')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body

  if( name === undefined || budget === undefined ){
    res.status(400).json({ message: "name and budget are required" })
    return
  }

  const nameIsString = typeof(name) === "string"
  if( !nameIsString ){
    res.status(400).json({ message: "name of account must be a string" })
    return
  }

  const budgetIsNum = typeof(budget) === "number"
  if( !budgetIsNum ){
    res.status(400).json({ message: "budget of account must be a number" })
    return
  }

  // have to check the types before doing things like .trim()
  // which is why I don't do them all together in one if else chain
  const nameInRange = ( 2 < name.trim().length && name.trim().length < 101 )
  const budgetInRange = ( 0 <= budget && budget <= 1000000 )

  if( !nameInRange ){
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if( !budgetInRange ){
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    req.accountPayload = { name: name.trim(), budget }
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accountsWithName = await getByName(req.accountPayload.name)
  accountsWithName.length > 0
    ? res.status(400).json({ message: "that name is taken" })
    : next()
}

exports.checkAccountId = async (req, res, next) => {
  const account = await getById(req.params.id)
  if( account ){
    req.account = account
    next()
  } else {
    res.status(404).json({ message: "account not found" })
  }
}
