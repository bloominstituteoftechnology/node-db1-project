const router = require('express').Router()
const Account = require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      res.status(400).json({ message: err })
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  Account.getById(id)
    .then(
      account => {
        res.status(200).json(account)
      }
    )
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
  // DO YOUR MAGIC
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
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
})

module.exports = router;
