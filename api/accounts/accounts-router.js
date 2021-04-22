const express = require("express")

const router = express.Router()
const db = require("./accounts-model")

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const allAccounts = await db.getAll()
    res.status(200).json(allAccounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
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
  // DO YOUR MAGIC
})

module.exports = router;
