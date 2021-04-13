exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body

  if( name === undefined || budget === undefined ){
    res.status(400).json({ message: "name and budget are required" })
    return
  }

  const nameIsString = typeof(name) === "string"
  const nameInRange = ( 2 < name.trim().length < 101 )
  const budgetIsNum = typeof(budget) === "number"
  const budgetInRange = ( 0 <= budget <= 1000000 )

  if( !nameIsString ){
    res.status(400).json({ message: "name of account must be a string" })
  } else if( !nameInRange ){
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if( !budgetIsNum ){
    res.stauts(400).json({ message: "budget of account must be a number" })
  } else if( !budgetInRange ){
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    req.accountPayload = { name: name.trim(), budget }
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
