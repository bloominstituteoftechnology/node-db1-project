const router = require('express').Router()
const account = require('./accounts-model')
const mw = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  account.getAll() 
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      res.json({ message: err.message })
    })
})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  const {id} = req.params
  account.getById(id)
    .then(account => {
      res.json(account)
    })
    .catch(err => {
      res.json({ message: err.message })
    })
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res, next) => {
  account.create(req.body)
    .then(account => {
      res.json(account)
    })
    .catch(err => {
      res.json({ message: err.message })
    })
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res, next) => {
  const {id} = req.params
  const changes = req.body
  account.updateById(id, changes)
    .then(account => {
      res.json(account)
    })
    .catch(err => {
      res.json({ message: err.message })
    })
  
});

router.delete('/:id', mw.checkAccountId, (req, res, next) => {
  const {id} = req.params
  account.deleteById(id)
    .then(account => {
      res.json(account)
    })
    .catch(err => {
      res.json({ message: err.message })
    })
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  
})

module.exports = router;
