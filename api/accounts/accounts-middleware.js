const db = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  if(!req.body.name || !req.body.budget){
    res.status(400).send({ message: "name and budget are required" });
  }
  else if(typeof req.body.name !== "string"){
    res.status(400).send({ message: "name of account must be a string" });
  }
  else if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100 ){
    res.status(400).send({ message: "name of account must be between 3 and 100" });
  }
  else if(Number.isFinite(req.body.budget)){
    res.status(400).send({ message: "budget of account must be a number" });
  }
  else if(req.body.budget < 0 || req.body.budget > 1000000)
    res.status(400).send({ message: "budget of account is too large or too small" });
  else 
    next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  db.getByName(req.body.name.trim())
  .then((response) => {
    if(response.length > 0){
      res.status(400).send({ message: "that name is taken" });
    }
    else
      next();
  })
}

exports.checkAccountId = async (req, res, next) => {
  db.getById(req.params.id)
  .then((response) => {
    if(response.length > 0){
      req.account = response;
      next();
    }
    else
      res.status(404).send({ message: "account not found" })
  })
}
