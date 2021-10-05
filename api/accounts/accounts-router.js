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
    const account = await Account.getById(req.params.id)
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.post('/',
  checkAccountPayload, checkAccountNameUnique, 
  async (req, res, next) => {
    try{
      const newAccount = await Account.create({
        name: req.body.name.trim(), 
        budget: req.body.budget
      })
      res.status(201).json(newAccount)
    }catch(err){
      next(err)
    }
})

router.put('/:id',
  checkAccountPayload, checkAccountNameUnique,
  checkAccountId, async (req, res, next) => {
    const updated = await Account.updateById(req.params.id, req.body)
    try{
      res.json(updated)
    }catch(err){
      next(err)
    }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    await Account.deleteById(req.params.id)
    res.json(req.account)
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
