// const router = require('express').Router()
const express = require("express")
const model = require("./accounts-model");
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require("./accounts-middleware");
const router = express.Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await model.getAll();
    res.status(200).json(account)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await model.getById(req.params.id)
    res.status(200).json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload(), checkAccountNameUnique(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const post = await model.create(req.body)
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload(), checkAccountId(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updateAccount = await model.updateById(req.params.id, req.body)
    res.status(200).json(updateAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountPayload(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deleteAccount = await model.deleteById(req.params.id)
    res.status(200).json({message: "Account has been deleted"})
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({
    message: "something went wrong",
    errorMessage: err.message
  })
})

module.exports = router;
