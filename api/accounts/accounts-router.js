const router = require('express').Router()
const { 
  checkAccountId, 
  checkAccountPayload, 
  checkAccountNameUnique 
} = require('./accounts-middleware')
const Accounts = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
    const account = await Accounts.getById(req.params.id)
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.post('/',
checkAccountPayload, 
checkAccountNameUnique,
async(req, res, next) => {
 try{
  const newAccount = await Accounts.create(req.body)
  res.status(201).json(newAccount)
 }catch(err){
   next(err)
 }
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  const { id } = req.params
  Account.updateById(id, req.body)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params
  Accounts.deleteById(id)
    .then(deletedAccount => {
      res.status(200).json(deletedAccount)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })  
})

module.exports = router;
