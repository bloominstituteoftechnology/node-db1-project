const router = require('express').Router()
const Accounts = require("./accounts-model")
const {checkAccountId} = require("../accounts/accounts-middleware")

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
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
