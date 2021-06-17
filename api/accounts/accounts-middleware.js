const accounts = require('./accounts-model.js');


// - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:

// - If either name or budget are undefined, return `{ message: "name and budget are required" }`
// - If name is not a string, return `{ message: "name of account must be a string" }`
// - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
// - If budget is not a number, return `{ message: "budget of account must be a number" }`
// - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`
exports.checkAccountPayload = (req, res, next) => {
  //const {name, budget} = req.body
  const acctpayload = req.body
  //console.log(acctpayload, "Account payload should be name and budget");
  if(!acctpayload.name || !acctpayload.budget){
    res.status(400).json({message:'name and budget are required'})
  }else if(typeof acctpayload.name !== 'string' || acctpayload.name < 3 || acctpayload.name > 100 ){
    res.status(400).json({message:"name of account must be a string between 3 and 100 characters"})
  }else if(typeof acctpayload.budget !== 1 || acctpayload.budget < 0 || acctpayload.budget > 1000000){
    res.status(400).json({message:"budget of account must be a number that is not below 0 or over 1 million"})
  }else{
    next()
  }
}

//`checkAccountId` returns a status 404 with a `{ message: "account not found" }` if `req.params.id` does not exist in the database
exports.checkAccountId = async (req, res, next) => {
  try {
    const acctId = req.params.id;
    const account = await accounts.getById(acctId);
      if(!account){
        res.status(404).json([]);
      }else{
        req.account = account;
        next();
      }
  }catch(error){
    res.status(500).json({message: "Error"})
  }
}

//- `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
exports.checkccountNameUnique = async (req, res, next) => {
  try{
    const {name, budget} = req.body
    const checkAcctName = req.body.name
    const account = await accounts.map((acct) => {
      if(acct.name === checkAcctName){
        res.status(404).json({message: "that name is taken"})
      }else{
        req.account = account;
        next();
      }
    })
  }catch(error){
    res.status(500).json({message: "Error"})
  }
}


