const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();


//get all accounts
router.get('/', async (req, res, next) => {
  try {
const accounts = await db.select('*').from('accounts')
res.json(accounts)
  } catch (err) {
    next(err)
  }
})

//get an account by id
router.get('/:id', async (req, res, next) => {
  try {
const [account] = await db
.select('*')
.from('accounts')
.where('id', req.params.id)
.limit(1)

res.json(account)
  } catch (err) {
    next(err)
  }
})

//add a new account
router.post('/', async (req, res, next) => {
  try {
const payload = {
  name: req.body.name,
  budget: req.body.budget
}

if(!payload.name || !payload.budget) {
  return res.status(400).json({
    message: 'Name and budget required',
  })
}

const [id] = await db.insert(payload).into('accounts')

const account = await db
.first('*')
.from('accounts')
.where('id', id)

res.status(201).json(account)

  } catch (err) {
    next(err)
  }
})


//update an account
router.put('/:id', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    
    if(!payload.name || !payload.budget) {
      return res.status(400).json({
        message: 'Name and budget required',
      })
    }
    
    await db('accounts').where('id', req.params.id).update(payload)
    
    const account = await db
    .first('*')
    .from('accounts')
    .where('id', req.params.id)
    
    res.status(201).json(account)
  } catch (err) {
    next(err)
  }
})

//delete an account
router.delete('/:id', async (req, res, next) => {
  try {
await db('accounts').where('id', req.params.id).del()

res.status(201).json({
  message: "Account deleted",
})
  } catch (err) {
    next(err)
  }
})


module.exports = router