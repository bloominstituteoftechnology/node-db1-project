const Acc = require('./accounts-model')
const yup = require('yup')
const messageSchema = yup.object({
  name: yup.string()
  .trim()
  .min(3, 'between 3 and 100')
  .max(100, 'between 3 and 100')
  .matches(/^[aA-zZ\s]+$/, "must be a string")
  .required('name and budget are required'),
  budget: yup.number()
  .required('name and budget are required')
  .typeError("must be a number")
  .positive('too large or too small')
  .max(1000000, 'too large or too small'),
})


exports.checkAccountPayload = async (req, res, next) => {
  try{
    const validate = await messageSchema.validate(req.body, {stripUnknown: true})
    req.body = validate
    next()
  } catch (err){
    next({status :400, message: err.message})
  }
}
exports.checkAccountNameUnique = (req, res, next) => {
  Acc.getAll()
  .then(data =>{
    data.map(stuff =>{ 
      if(stuff.name === req.body.name){
        res.status(400).json('name is take')
        next()
      }
    })
  })
  .then(next)
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const acc = await Acc.getById(req.params.id)
    if(!acc) {
      next({ status:404, message: `account not found`})
    } else {
      console.log(acc)
      req.acc = acc
      next()
    }
  } catch(err) {
    next(err)
  }
}