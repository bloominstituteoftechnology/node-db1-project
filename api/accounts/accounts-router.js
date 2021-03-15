const router = require('express').Router()
const accountsModel = require("./accounts-model")

router.get('/', async (req, res, next) => {
  try {
    const accounts = await accountsModel.getAll
    res.status(200).json(accounts)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  accountsModel.getById(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(next(err))
})

router.post('/', async (req, res, next) => {
  try {
    await accountsModel.create(req.body)
    const addedAccount = await accountsModel.getById(req.accounts.length)
    res.status(200).json(addedAccount)
  }
  catch (err) {
    next()
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await accountsModel.updateById(req.params.id, req.body)
    const updatedAccount = await accountsModel.getById(req.params.id)
    res.status(202).json(updatedAccount)
  }
  catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedAccount = await accountsModel.getById(req.params.id)
    await accountsModel.deleteById(req.params.id)
    res.json(`Your account ${deletedAccount} has been deleted`)
  }
  catch (err) {
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

module.exports = router;
