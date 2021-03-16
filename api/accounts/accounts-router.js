const express = require('express');
const accounts = require('./accounts-model');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');
const router = express.Router();

const root = process.env.API_ROOT || `/api`;
//use this to prevent issues with knex config among other things.

router.get(`${root}/accounts`, async (req, res, next) => {
  // DO YOUR MAGIC
    try {
      const data = await accounts.getAll();
      res.status(200).json(data);
    } catch (err) {
        next(err);
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
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
