const accounts = require("./accounts-model");

// - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (
    typeof req.body.name === "undefined" ||
    typeof req.body.budget === "undefined"
  ) {
    //console.log("incoming value middleware",req.body)
    return res.status(400).json({
      // - If either name or budget are undefined, return `{ message: "name and budget are required" }`
      message: "name and budget are required",
    });
  } else if (
    typeof req.body.budget !== "number" ||
    Number.isNaN(req.body.budget)
  ) {
    // - If budget is not a number, return `{ message: "budget of account must be a number" }` adjusted test to match expectation from readme.
    return res.status(400).json({
      message: "budget of account must be a number",
    });
  } else if (typeof req.body.name !== "string") {
    return res.status(400).json({
      // - If name is not a string, return `{ message: "name of account must be a string" }`
      message: "name of account must be a string",
    });
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    return res.status(400).json({
      // - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
      message: "name of account must be between 3 and 100",
    });
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    // - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`
    return res.status(400).json({
      message: "budget of account is too large or too small",
    });
  }

  next();
};

// - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const trimmedName = req.body.name.trim();
  accounts
    .getAll()
    .then((accounts) => {
      const nameExists = accounts.find(
        (element) =>
          element.name.trim().toLowerCase() === trimmedName.toLowerCase()
      );
      if (nameExists) {
        return res.status(400).json({
          message: "that name is taken",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

// - `checkAccountId` returns a status 404 with a `{ message: "account not found" }` if `req.params.id` does not exist in the database
exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  accounts
    .getById(req.params.id)
    .then((account) => {
      if (account) {
        req.account = account;
        //console.log(req.account);
        next();
      } else {
        res.status(404).json({
          message: "account not found",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
