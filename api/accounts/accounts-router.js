const router = require('express').Router()
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Account.getById()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Account.create()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const data = await Account.updateById()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const data = await Account.deleteById()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
