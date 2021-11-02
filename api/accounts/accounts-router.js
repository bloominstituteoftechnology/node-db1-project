const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')

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

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  let { name, budget } = req.body;
  name= name.trim()
  await Accounts.create({name, budget})
    .then(newAccount => {
      res.status(201).json(newAccount)
    })
  .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  await Accounts.updateById(req.params.id, req.body)
    .then(updatedAccount => {
    res.status(200).json(updatedAccount)
    })
  .catch(next)
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  await Accounts.deleteById(req.params.id)
    .then(() => {
    res.status(200).json({message:"account deleted successfully"})
    })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 400).json({ message: err.message,})
})

module.exports = router;
