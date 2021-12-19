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
  (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json("post account")
  } catch(err)  {
    next(err)
  }
})

router.put(
  '/:id', 
  md.checkAccountId, 
  md.checkAccountNameUnique,
  md.checkAccountPayload,
  (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json("update account")
  } catch(err)  {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json("delete account")
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
