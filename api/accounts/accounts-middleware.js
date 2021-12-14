exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountPayload middleware')
  next()
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountNameUnique middleware')
  next()
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountId middleware')
  next()
}
