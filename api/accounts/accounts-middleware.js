const accnt=require("../accounts/accounts-model")


exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
 
  return (req,res,next)=>{
    try{
    if(!req.body.name && !req.body.budget){
        res.status(400).json({
            message:"name and budget are required"
        })
    }
    else if(!req.body.name.typeOf(!String)){
        res.status(400).json({
            message:"Name of account must be a string"
        })
    }
    else if(req.body.name.length()<3 && req.body.name.length()>100){
      res.status(400).json({
          message:"Name of account must be between 3 and hundred"
      })
  }
  else if(!req.body.budget>0 && !req.body.budget<1000000){
    res.status(400).json({
      message:"budget of account is too large or too small"
    })
  }
    else{
        next()
    }
}catch(err){
  next(err)
}
  }
}


exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  return (req, res, next) => {

    try{
     const user= accnt.getById(req.body.name)
			// .then((user) => {
				if (user) {
					// set a value to the request so it can be
					// accessed later in the middleware stack
					// req.user = user
          res.status(400).json({
            message:"That name is taken"
          })
					
				} else {
					next()
					
				}
			
    }catch{(error) => {
				next(error)
			}
    }
  }
    	
}

exports.checkAccountId = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try{
	      const user=	await accnt.getById(req.params.id)
			
				if (user) {
					// console.log("user found"+user)
					 req.user = user
          next()
					
				} else {
          res.status(400).json({
            message:"account not found"
          })		
    }
  }catch(err){next(err)}
    }
  }