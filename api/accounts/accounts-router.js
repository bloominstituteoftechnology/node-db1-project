const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json('get accounts')
  } catch(err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  res.status(req.account)
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try{
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', md.checkAccountPayload, md.checkAccountPayload, async (req, res, next) => {
  const updated = await Account.updateById(req.parans.id, req.body)
  res.json(updated)
  try{
    res.json('update account')
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    await Account.deleteById(req.params.id)
    res.json('delete account')
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ 
    message: err.message,
  })
})

module.exports = router;
