const router = require('express').Router()

const Accounts = require('./accounts-model');
const {checkAccountId} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
  if (req.account) {
    res.status(200).json(req.account);
  } else {
    next();
  }
});

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
});

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
