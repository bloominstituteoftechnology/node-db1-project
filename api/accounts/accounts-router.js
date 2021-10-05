const router = require('express').Router()
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require("./accounts-middleware")

router.get('/', (req, res, next) => {
  try{
    res.json("placeholder")
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  try{
    res.json("placeholder")
  }catch(err){
    next(err)
  }
})

router.post('/',
  checkAccountPayload, checkAccountNameUnique, 
  (req, res, next) => {
    try{
      res.json("placeholder")
    }catch(err){
      next(err)
    }
})

router.put('/:id',
  checkAccountId, checkAccountNameUnique,
  checkAccountPayload, (req, res, next) => {
    try{
      res.json("placeholder")
    }catch(err){
      next(err)
    }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  try{
    res.json("placeholder")
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router
