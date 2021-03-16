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

router.get(`${root}/accounts/:id`, checkAccountId(), async (req, res, next) => {
  // DO YOUR MAGIC
    try {
      const data = await accounts.getById(req.params.id);
      res.status(200).json(data);
    } catch (err) {
        next(err);
    }
})

router.post(`${root}/accounts`, checkAccountPayload(), checkAccountNameUnique(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await accounts.create(req.body);
    res.status(201).json(data);
  } catch (err) {
      next(err);
  }
})

router.put(`${root}/accounts/:id`, checkAccountId(), checkAccountPayload(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await accounts.updateById(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
      next(err);
  }
});

router.delete(`${root}/accounts/:id`, checkAccountId(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await accounts.deleteById(req.params.id);
    res.status(204).end();
  } catch (err) {
      next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
