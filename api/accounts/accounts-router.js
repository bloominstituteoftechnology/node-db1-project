const router = require('express').Router()
const express = require('express')
const Account = require('./accounts-model')
const middleware = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', middleware.checkAccountId, async (req, res, next) => {
    const account = await Account.getById(req.params.id)
    res.json(req.account)
})

router.post('/', middleware.checkAccountPayload, middleware.checkAccountNameUnique, async (req, res, next) => {
    try{
      const newAccount = await Account.create(req.body)
      res.status(201).json(newAccount)
    }catch(err){
      next(err)
    }
})

router.put('/:id', middleware.checkAccountId, middleware.checkAccountPayload, async (req, res, next) => {
  try{
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', middleware.checkAccountId, async (req, res, next) => {
  try{
    const account = await Account.deleteById(req.params.id)
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({message: err.message})
})

module.exports = router;
