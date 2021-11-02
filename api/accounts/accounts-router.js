const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountPayload } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  await Accounts.getAll(req.query)
    .then(accounts => {
    res.status(200).json(accounts)
    })
  .catch(next)
})

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.verified)
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  let { name, budget } = req.body;
  name= name.trim()
  await Accounts.create({name, budget})
    .then(newAccount => {
      res.status(201).json(newAccount)
    })
  .catch(next)
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
