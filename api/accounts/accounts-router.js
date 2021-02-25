const router = require('express').Router();
const db = require('./accounts-model');
const middleware = require('./accounts-middleware');


router.get('/', async (req, res, next) => {
  db.getAll()
  .then((respon) => {
    res.send(respon);
  })
})

router.get('/:id', middleware.checkAccountId, (req, res, next) => {
  res.send(req.account);
})

router.post('/', middleware.checkAccountPayload, middleware.checkAccountNameUnique, (req, res, next) => {
  db.create(req.body)
  .then((response) => {
    res.send(response);
  })
  
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
