const Account = require("./accounts-model");
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  try {
    const { name, budget } = req.body;
    if (!name || !budget) {
      res.status(400).json({
        message: "name and budget are required",
      });
      next();
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      res.status(400).json({
        message: "name of account must be between 3 and 100",
      });
      next();
    } else if (typeof budget !== "number") {
      res.status(400).json({
        message: "budget of account must be a number",
      });
      next();
    } else if (!budget || budget > 10 ** 6) {
      res.status(400).json({
        message: "budget of account is too large or too small",
      });
      next();
    }
  } catch {}
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(404).json({
        message: "account not found",
      });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};
