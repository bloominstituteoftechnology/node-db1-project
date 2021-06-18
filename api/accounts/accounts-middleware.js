
const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  let {name, budget} = req.body
  let trimmedName = undefined;

  if (name && typeof name === "string") {
    trimmedName = name.trim()
  }
  /*
  NOTE:  if budget = NaN, then budget is falsy
  if budget is !Nan, then budget is true
  Therefore, budget = Nan will flag the first conditional
  So we have to use typeof budget === "undefined"... instead of !budget because when budget = NaN it returns the wrong error when it flags the first conditional
  */
  if (typeof name === "undefined" || typeof budget === "undefined") {
    // name and budget must be defined, budget = NaN will flag here    
    res.status(400).json({ message: "name and budget are required"})

  } else if (typeof budget !== "number" || Number.isNaN(budget)) {
    // budget must be a number
    res.status(400).json({ message: "budget must be a number" })  

  } else if (budget < 0 || budget > 1000000) {
    // budget must be between 0 & 1000000
    return res.status(400).json({ message: "budget of account is too large or too small" });

  } else if (typeof name !== "string") {
      // name must be a string
      res.status(400).json({ message: "name must be a string" })

  } else if (trimmedName.length < 3 || trimmedName.length > 100) {
    // name must be b/t 3 & 30 char
    res.status(400).json({ message: "name of account must be between 3 and 100 characters long" })

  } else {

    const account = {
      name: trimmedName,
      budget: budget
    }
    req.account = account;
    // how do you catch errors in the validation
    next();
  }
  console.log("Done with payload validation")
}


exports.checkAccountNameUnique = (req, res, next) => {
  let newName = req.body.name;
  newName = newName.trim().toLowerCase();

  Account.getAll()
    .then ((accounts) => {
      const existingAccount = accounts.find((account) => {
        return account.name.trim().toLowerCase() === newName;
      })

      if (existingAccount) {
        return res.status(400).json({ message: "that account name is taken" });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.checkAccountId = async (req, res, next) => {

  try{
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    } else {
      res.status(404).json({message:"account not found"})
    }
  } catch (err) {
    next(err)
  }
}
