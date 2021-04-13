const router = require('express').Router()
const Accounts = require('./accounts-model')
const  mw = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await Accounts.getAll()
    res.status(200).json(accounts)
  }
  catch(err){
    next(err)
  }
})

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.status(200).json(req.account)
  }
  catch(err){
    next(err)
  }
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Accounts.create(req.body)
    res.status(200).json(newAccount)
  }
  catch(err){
    next(err)
  }
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  const incoming =req.body
  try{
    const update = await Accounts.updateById(id, incoming)
    res.status(200).json(update)
  }
  catch(err){next(err)}
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  try{
    const deleted = await Accounts.deleteById(id)
    res.status(200).json(deleted)
  }
  catch(err){next(err)}
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({message: err.message, stack : err.stack})

})

module.exports = router;
