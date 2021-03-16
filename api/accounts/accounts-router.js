const router = require('express').Router()
const Accounts = require('./accounts-model');
//const { } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.getAll(); // wait for data to come back
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.getById(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
    .then(() => {
      res.status(202).json(req.body)
    }).catch(err => {
      next(err)
    })
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  // const {id} = req.params;
  // const {accounts} = req.body
  Accounts.updateById(req.params.id, req.body)
    .then(account => {
      res.status(200).json(account)
    }).catch(err => {
      next(err)
    })
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted)
    }).catch(err => {
      next(err);
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
