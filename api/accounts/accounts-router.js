const router = require('express').Router();
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware.js');
const Account = require("./accounts-model.js");

router.get('/', async (req, res) => {
  // DO YOUR MAGIC
  try {
    const  data  = await Account.getAll();
    res.status(200).json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
  // DO YOUR MAGIC
  try {
    res.status(200).json(req.account)   
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.post('/',checkAccountPayload, checkAccountNameUnique, async (req, res) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.delete('/:id', checkAccountId, async (req, res) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await Account.deleteById(req.params.id)
    res.status(200).json(deletedAccount)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
