const router = require('express').Router()
const Accounts = require('./accounts-model');
const mw = require('./accounts-middleware');


router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    const data = await Accounts.getAll()
    res.json(data)
  } catch(err) {
    next(err)
  }

})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    next(err)
  })
})

router.put('/:id', mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    next(err)
  })
});

router.delete('/:id', mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    next(err)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
