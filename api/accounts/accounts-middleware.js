const accounts = require('./accounts-model')

exports.checkAccountPayload = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
        const name = req.body.name;
        const budget = req.body.budget;

        if (!name || !budget) {
          res.status(400).json({ message: "name and budget are required" });
        } else if (typeof name !== 'string') {
          res.status(400).json({ message: "name of account must be a string" });
        } else if (typeof budget !== 'number') {
          // console.log(name, budget);

          res.status(400).json({ message: "budget of account must be a number" });
        } else if (name.trim().length < 3 || name.trim().length > 100) {
          res.status(400).json({ message: "name of account must be between 3 and 100" });
        } else if (budget < 0 || budget > 1000000) {
          res.status(400).json({ message: "budget of account is too large or too small" });
        } else {
          req.body.name = name.trim();
          next();
        }

    } catch (err) {
          next(err);
    }
  }
}
exports.checkAccountNameUnique = async (req, res, next) => {
  const acct = await accounts.getAll();
  const nameTest = req.body.name.trim();

  const results = acct.filter((item) => {
    if ( item.name === nameTest) {
      return item;
    }
  })
  if (results.length > 0) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
} 




exports.checkAccountId = async (req, res, next) => {
  const acct = await accounts.getById(req.params.id)
  if (acct){
    req.account = acct;
    next()
  } else {
    res.status(404).json({message: "account not found"})
  }
}
