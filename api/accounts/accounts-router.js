const router = require('express').Router()
const { checkAccountPayload, checkAccountId } = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.body)
  .then(newAccount => {
    res.status(201).json(newAccount)
  })
  .catch(err => {
    res.status(400).json({ message: err.message })
  })
})

router.put('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
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
  // DO YOUR MAGIC
  const { id } = req.params
  Account.deleteById(id)
    .then(deletedAccount => {
      res.status(200).json(deletedAccount)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
