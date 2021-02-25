const router = require('express').Router();
const db = require('./accounts-model');
const middleware = require('./accounts-middleware');


router.get('/', async (req, res, next) => {
  db.getAll()
  .then((respon) => {
    res.send(respon);
  })
  .catch((err) => {
    next(err);
  })
})

router.get('/:id', middleware.checkAccountId, (req, res, next) => {
  res.send(req.account);
})

router.post('/', middleware.checkAccountPayload, middleware.checkAccountNameUnique, (req, res, next) => {
  db.create({...req.body, name: req.body.name.trim()})
  .then((response) => {
    res.send(response);
  })
  .catch((err) => {
    next(err);
  })
  
})

router.put('/:id', middleware.checkAccountId, (req, res, next) => {
  db.updateById(req.params.id, req.body)
  .then((response) => {
    db.getById(req.params.id)
    .then((resp) => {
      res.send(resp);
    })
  })
  .catch((err) => {
    next(err);
  })
});

router.delete('/:id', middleware.checkAccountId,  (req, res, next) => {
  db.deleteById(req.params.id)
  .then(() => {
    res.send(req.account);
  })
  .catch((err) => {
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
