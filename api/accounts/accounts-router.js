const router = require('express').Router()
const Accounts = require('./accounts-model')
// import middleware

router.get('/', (req, res, next) => {
  try {
    const data = await Accounts.get()
    res.json(data)

  } catch (err) {
    next (err)
  }
})

router.get('/:id', async (req, res) => {

  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({message: err.message, stack : err.stack})
  // DO YOUR MAGIC
})

module.exports = router;
