const router = require('express').Router()

const accounts = require('./accounts-model.js')
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware.js')

router.get('/', async (req, res, next) => {
  const allAccounts = await accounts.getAll()
  res.status(200).json(allAccounts)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const newAccount = await accounts.create(req.accountPayload) 
  res.status(201).json(newAccount)
})

router.put('/:id', checkAccountPayload, checkAccountNameUnique, checkAccountId, async (req, res, next) => {
  const updatedAccount = await accounts.updateById(req.params.id, req.accountPayload)
  res.status(200).json(updatedAccount)
})

router.delete('/:id', checkAccountId, (req, res, next) => {
  accounts.deleteById(req.params.id)
    .then( () => {
      res.status(200).json(req.account)
    })
})


// not exactly sure how to use with async/await, or if nessacary
router.use((err, req, res, next) => {

})

module.exports = router;
