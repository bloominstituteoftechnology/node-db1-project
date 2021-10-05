const router = require('express').Router()

const Accounts = require('./accounts-model');
const {
  checkAccountId, 
  checkAccountPayload,
  checkAccountNameUnique
} = require('./accounts-middleware');

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

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  (req, res, next) => {
    Accounts.create(req.body)
      .then(account => {
        res.status(201).json(account);
      })
      .catch(next);
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
