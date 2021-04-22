const router = require('express').Router()
const { checkAccountPayload, checkAccountId } = require('./accounts-middleware')
const db = require("./accounts-model")

router.get('/', async (req, res, next) => {
    try {
      const accounts = await db.getAll()
      res.status(200).json(accounts)
    } catch(err) {
      next(err)
    }
  })

router.get('/:id', async (req, res, next) => {
  try {
    const accounts = await db.getById(req.account.id)
    res.status(200).json(accounts)
  } catch(err) {
    next(err)
  }
})

router.post('/', checkAccountPayload(), async (req, res, next) => {
  try {
    const accounts = await db.create(req.body)
    res.status(201).json(accounts)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountId(), checkAccountPayload(), (req, res, next) => {
  db.updateById(req.account.id, req.body)
    .then(account => res.status(200).json(account))
    .catch(next)
});

router.delete('/:id', checkAccountId(), async (req, res, next) => {
  try {
    await db.deleteById(req.account.id)
    res.status(204).end()
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.log(err)

  res.status(500).json({
    message: "Something went wrong",
  })
})

module.exports = router;
