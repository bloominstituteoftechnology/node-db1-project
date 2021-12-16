const router = require('express').Router()
const md = require('./accounts-middleware.js')
const Account = require('../accounts/accounts-model.js')

//testing if I can go back and forth when accessing instead 
// of directly going ('./accounts-model.js)

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
    //next({status:422, message: 'test error next'})
    //422 = unprocessable entity
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  // all done by middleware:
  // try {
  //   const account = await Account.getById(req.params.id)
  //   res.json(account)
  // } catch (err) {
  //   next(err)
  // }
  res.json(req .account)
})

router.post(
  '/', 
  md.checkAccountPayload,
  md.checkAccountNameUnique, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create(req.body) 
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})


router.put('/:id', 
  md.checkAccountPayload,
  //md.checkAccountNameUnique, 
  md.checkAccountId,
 async  (req, res, next) => { //put is update
    const updated = await Account.updateById(req.params.id, req.body)
    try {
      res.json('update account')
    } catch (err) {
      next(err)
    }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  })
})  
 
module.exports = router;
