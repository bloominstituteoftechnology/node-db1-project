const router = require('express').Router()
const Account = require("./accounts-model")
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{

    res.json("placeholder")
  }catch(err){
    next(err)
  }
})

router.post('/',
  checkAccountPayload, checkAccountNameUnique, 
  async (req, res, next) => {
    try{
      res.json("placeholder")
    }catch(err){
      next(err)
    }
})

router.put('/:id',
  checkAccountId, checkAccountNameUnique,
  checkAccountPayload, async (req, res, next) => {
    try{
      res.json("placeholder")
    }catch(err){
      next(err)
    }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
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
