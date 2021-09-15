exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('test 1')
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('test 2')
  next()
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('test 3')
  next()
}
