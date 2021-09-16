const router = require('express').Router();
const middleware = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', middleware.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', middleware.checkAccountPayload, async (req, res, next) => {
  try {
    const newAcc = await Account.create({name: req.body.name, budget: req.body.budget})
    res.status(201).json(newAcc)
  } catch (err) {
      next(err)
  }
})

router.put('/:id', middleware.checkAccountId, middleware.checkAccountPayload, async (req, res, next) => {
  try {
    const updated = await Account.updateById(req.params.id,req.body)
    res.json(updated)
  } catch (err) {
    res.status(404)
    next(err)
  }
});

router.delete('/:id', middleware.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.deleteById(req.params.id)
    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json(err) 
})

module.exports = router;
