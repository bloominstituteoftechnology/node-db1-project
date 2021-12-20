const router = require('express').Router()
const accountsMiddleware = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', accountsMiddleware.checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.post('/', accountsMiddleware.checkAccountPayload, accountsMiddleware.checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('create account')
  } catch (err) {
    next(err)
  }
})


router.put('/:id', 
  accountsMiddleware.checkAccountId, 
  accountsMiddleware.checkAccountPayload,
  accountsMiddleware.checkAccountNameUnique,
  (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('update account')
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', accountsMiddleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('delete account')
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
