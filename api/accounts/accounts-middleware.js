const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const account = req.body;

  if (!account || account.name === undefined || account.budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof account.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (
    account.name.trim().length < 3 ||
    account.name.trim().length > 100
  ) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (
    typeof account.budget !== "number" ||
    Number.isNaN(account.budget)
  ) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (account.budget < 0 || account.budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim();

  try {
    const account = await Accounts.getByName(name);

    if (!account) {
      next();
    } else {
      res.status(400).json({ message: "that name is taken" });
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const account = await Accounts.getById(id);

    if (account) {
      req.account = account;
      next();
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (err) {
    next(err);
  }
};
