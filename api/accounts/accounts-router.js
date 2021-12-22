const router = require('express').Router()
const Accounts = require("./accounts-model")
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require("../accounts/accounts-middleware")

router.get('/', async (req, res, next) => {
  try {
    const account = await Accounts.getAll()
    res.status(200).json(account)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
  next()
})

router.get('/:id',checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
  next()
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const newAccount = await Accounts.create(req.body)
  res.status(201).json(newAccount)
  next()
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const { id } = req.params
  const { body } = req.body
  
  const updatedAccount = await Accounts.updateById(id, body)
  res.status(200).json(updatedAccount)
  next()
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  const { id } = req.params
  
  const deletedAccount = await Accounts.deleteById(id)
  res.status(200).json(deletedAccount)
  
  next()
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
