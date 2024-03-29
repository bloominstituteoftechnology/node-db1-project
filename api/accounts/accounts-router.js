const router = require('express').Router()
const md = require('./accounts-middleware')
const Accounts = require('./accounts-model')


router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique,
 async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  } catch (err){
    next(err)
  }
})

router.put('/:id', md.checkAccountId, md.checkAccountPayload,
 md.checkAccountNameUnique, async (req, res, next) => {
  try {
    const updated = await Accounts.updateById(req.params.id, req.body)
    res.status(201).json(updated)
  } catch (err){
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  } catch {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
