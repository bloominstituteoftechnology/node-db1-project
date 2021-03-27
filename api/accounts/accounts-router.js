const router = require('express').Router()
const Account = require('./accounts-model')
const mw = require('../accounts/accounts-middleware.js')



router.get('/', async (req, res, next) => {
  try{
    const data = await Account.getAll()
    res.json(data)
  }catch(err){
    next(err)
  }
})

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  try{
    const {id} = req.params
    const data = await Account.getById(id)
    res.json(data)
  }catch(err){
    next(err)
  }
})

router.post('/', mw.checkAccountPayload, async(req, res, next) => {
  try{
    const account = req.body
    const data = await Account.create(account)
    res.json(data)
  }catch(err){
    next(err)
  }
})

router.put('/:id',mw.checkAccountPayload, mw.checkAccountId,async (req, res, next) => {
  try{
    const {id} = req.params
    const changes = req.body
    const data = await Account.updateById(id,changes)
    res.json(data)
  }catch(err){
    next(err)
  }
});

router.delete('/:id',mw.checkAccountId, async (req, res, next) => {
  try{
    const {id} = req.params
    const data = await Account.deleteById(id)
    res.json(data)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})