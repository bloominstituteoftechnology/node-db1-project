const Accounts = require("../accounts/accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget} = req.body
  if (name && budget) {
    next();
} else {
  res.status(400).json({ message: "Name and/or Budget is missing."})
}
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { name, id } = req.body;
  const nameIdExists = await Accounts.getById(name, id);
  if (nameIdExists) {
    next()
  } else {
    res.status(400).json({
      message: "Name does not exist."
    })
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params
  const idExists = await Accounts.getById(id);
  if (idExists) {
    next();
  } else {
    res.status(400).json({
      message: `Specified ID: ${id} does not exist.`
    })
  }
}
