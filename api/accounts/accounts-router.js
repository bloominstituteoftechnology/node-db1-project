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

router.post('/', 
accountsMiddleware.checkAccountPayload, 
accountsMiddleware.checkAccountNameUnique, 
async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Account.create({name: req.body.name.trim(), budget: req.body.budget})
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})


router.put('/:id', 
  accountsMiddleware.checkAccountId, 
  accountsMiddleware.checkAccountPayload,
  async (req, res, next) => {
  // DO YOUR MAGIC
    const updated = await Account.updateById(req.params.id, req.body)
    try{
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
})

router.delete('/:id', accountsMiddleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
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
