const router = require('express').Router()
// Pull in Middleware
const md = require('./accounts-middleware')
// Pull in Accounts Model
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/', 
md.checkAccountPayload, 
md.checkAccountNameUnique, 
(req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('post accounts')
  } catch(err) {
    next(err)
  }
})

router.put('/:id', 
md.checkAccountId,
md.checkAccountPayload, 
md.checkAccountNameUnique, 
 (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('update accounts')
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('delete accounts')
  } catch(err) {
    next(err)
  }
})

// General Error Handling Middleware
router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  })

})

module.exports = router;
