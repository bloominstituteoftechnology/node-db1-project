const router = require('express').Router()
const Accounts = require('./accounts-model');
const mw = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const data = await Accounts.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', mw.checkAccountId, async (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', mw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const deletedAccount = await Accounts.deleteById(req.params.id)
    res.json(deletedAccount)
  } catch (err) {
    next(err)
  }
})

// router.use((err, req, res, next) => { // eslint-disable-line
//   // DO YOUR MAGIC
// })

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
