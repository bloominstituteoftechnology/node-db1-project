const Account = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {

  const { name, budget } = req.body;
  console.log(name, budget);
  try {
    if (!name || !budget) {
      res.status(400).json({ message: "name and budget are required" });
    } else if (typeof name !== "string") {
      res.status(400).json({ message: "name of account must be a string" });
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      res.status(400).json({ message: "name of account must be between 3 and 100" });
    } else if (typeof budget !== "number") {
      res.status(400).json({ message: "budget of account must be a number" });
    } else if (budget < 0 || budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" });
    } else {
      next()
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const Accounts = await Account.getAll();
    const name = req.body.name.trim();

    const results = Accounts.filter((nameCheck) => {
      if (nameCheck.name === name) {
        return nameCheck;
      }
    })
    if (results.length > 0) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const id = await Account.getById(req.params.id);
    if (!id) {
      res.status(404).json({ message: "account not found" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}