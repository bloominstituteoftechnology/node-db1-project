const Account = require("./accounts-model.js");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name && budget) {
    next();
  } else if (!name || !budget) {
    res.status(400).json("name and budget are required");
  } else if (typeof name !== "string") {
    res.status(400).json("name of account must be a string");
  } else if (name.trim().length() < 3 || name.trim().length() > 100) {
    res.status(400).json("name of account must be between 3 and 100");
  } else if (typeof budget !== "number") {
    res.status(400).json("budget of account must be a number");
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json("budget of account is too large or too small");
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const newAccount = await Account.Create(req.body);

    if (newAccount.name !== req.body.name.trim()) {
      req.newAccount = newAccount;
      next();
    } else {
      res.status(400).json("that name is already taken");
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (account) {
      req.account = account;
      next();
    } else {
      res.status(404).json("account not found");
    }
  } catch (err) {
    next(err);
  }
};
