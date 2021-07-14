const router = require('express').Router();
const db = require('../../data/db-config');
const mw = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', mw.checkAccountNameUnique, mw.checkAccountPayload, async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body.trim())
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, async (req, res, next) => {
  try {
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(err.status || 404).json({
    message:err.message
  })
})

module.exports = router;
