const express = require('express');
const { checkAccountId, checkAccountPayload } = require("./accounts-middleware")
const Account = require("./accounts-model");

const router = express.Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll();
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => { 
  // DO YOUR MAGIC
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.status(204).json(updatedAccount)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    
    const deletedAccount = await Account.deleteById(req.params.id)
    res.status(200).json(deletedAccount)
  } catch (error) {
    next(error)
  }
})

router.use((err, res) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
