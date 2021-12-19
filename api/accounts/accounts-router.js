const router = require('express').Router()
// pulling in middleware 
const md = require("./accounts-middleware")
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    //throw new Error('yikes!!!')
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch(err)  {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
res.json(req.account)
})

router.post(
  '/', 
  md.checkAccountPayload, 
  md.checkAccountNameUnique, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch(err) {
    next(err)
  }
})

router.put(
  '/:id', 
  md.checkAccountId, 
  md.checkAccountPayload,
  async (req, res, next) => {
  const updated = await Account.updateById(req.params.id, req.body)
  res.json(updated)
  try{
    res.json("update account")
  } catch(err)  {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    //res.json("delete account")
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch(err)  {
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
