const Account = require("./accounts-model.js");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const account = await Account.get;
  } catch {}
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (account) {
      req.account = account;
      next();
    } else {
      res.status(404).json("Account not found");
    }
  } catch (err) {
    next(err);
  }
};
