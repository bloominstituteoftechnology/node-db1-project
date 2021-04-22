// const router = require('express').Router()
const express = require("express")
const model = require("./accounts-model");
const { checkAccountPayload } = require("./accounts-middleware");
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

router.post('/', checkAccountPayload(), async, (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.budget) {
    return res.status(400).json({
      message: "Need name and budget."
    })
  }

  try {
    const post = await model.create(req.body)
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {

  } catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {

  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC

})

module.exports = router;
