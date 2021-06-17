const router = require('express').Router()
const db = require("../../data/db-config");

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  db.select("*")
  .from("accounts")
  .then((accountsArray) => {
    res.status(200).json({
      data: accountsArray,
    });
  })
  .catch((err) => {
    console.log({ err });
  });
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
