const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id)
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.post('/',
 md.checkAccountPayload, 
 md.checkAccountNameUnique,
 (req, res, next) => {
  try{
res.json('post account')
  }catch(err){
    next(err)
  }
})

router.put('/:id', 
md.checkAccountId, 
md.checkAccountNameUnique, 
md.checkAccountPayload,
(req, res, next) => {
  try{
res.json('update account')
  }catch(err){
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, (req, res, next) => {
  try{
res.json('delets accounts')
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })  
})

module.exports = router;
