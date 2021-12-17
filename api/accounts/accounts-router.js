const router = require('express').Router()
const Accounts = require('./accounts-model')
const mw = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', mw.checkAccountId, async (req, res) => {
  const account = await Accounts.getById(req.params.id)
  res.json(account)
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique , async (req, res, next) => {
  try{
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, async (req, res, next) => {
  try{
    const updated = await Accounts.updateById(req.params.id, req.body)
    res.json(updated)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  try{
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 201).json(err)
})

module.exports = router;