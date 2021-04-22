const router = require('express').Router()
const { checkAccountPayload, checkAccountId } = require('./accounts-middleware')
const db = require("./accounts-model")

router.get('/', (req, res, next) => {
    db.getAll()
      .then(accounts => res.status(200).json(accounts))
      .catch(next)
})

router.get('/:id', checkAccountId(), (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
})

router.post('/', checkAccountPayload(), (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountId(), checkAccountPayload(), (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId(), (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.log(err)

  res.status(500).json({
    message: "Something went wrong",
  })
})

module.exports = router;
