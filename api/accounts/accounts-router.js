const express = require("express")

const router = express.Router()
const db = require("./accounts-model")

const { checkAccountPayload, checkAccountId } = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const allAccounts = await db.getAll()
    res.status(200).json(allAccounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accountID = await db.getById(req.params.id)
      if (accountID) {
      res.status(200).json(accountID)
      }
      next()
  } catch(err) {
      next(err)
  }
})

router.post('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await db.create(req.body)
      res.status(201).json(account)

  } catch(err) {
      next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await db.updateById(req.params.id, req.body)
      res.status(201).json(account)
  
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
      db.deleteById(req.params.id)
        res.status(200).json({message: "The account has been deleted"})
  
  } catch(err) {
    next(err)
  } 
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
