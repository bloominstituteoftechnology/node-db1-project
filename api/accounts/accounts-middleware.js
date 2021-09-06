const { getById, getByName } = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  let { name, budget } = req.body;
  const keys = Object.keys(req.body);

  if (!keys.includes("name") || !keys.includes("budget")) {
    next({
      status: 400,
      message: `name and budget are required`,
    });
  } else if (typeof name !== "string") {
    next({
      status: 400,
      message: `name must be a string`,
    });
  } else if (name.trim().length < 3 || name.trim().length >= 100) {
    next({
      status: 400,
      message: `name must be between 3 and 100 char`,
    });
  } else if (typeof budget !== "number") {
    next({
      status: 400,
      message: `budget must be a number`,
    });
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: `budget too large or too small`,
    });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try {
    const existingAccount = await getByName(name);
    if (existingAccount[0]) {
      next({
        status: 400,
        message: `name is taken`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await getById(id);
    if (account.length > 0) {
      req.account = account[0];
      next();
    } else {
      next({ status: 404, message: `account not found` });
    }
  } catch (err) {
    next(err);
  }
};
