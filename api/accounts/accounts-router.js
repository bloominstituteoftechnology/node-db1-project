const router = require('express').Router()
const Account = require('./accounts-model')
const {
  checkAccountId,
  checkAccountNameUnique, 
  checkAccountPayload 
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.account)
  .then(account => {
    res.status(201).json(account)
  })
  .catch(next)
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Account.updateById(req.params.id, req.account)
  .then(account => {
    res.status(200).json(account)
  })
  .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
  .then(account => {
    res.status(200).json(account)
  })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: 'something went wrong',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;