


const express = require('express');
const Accounts = require('../accounts/accounts-model');
const mw = require('../accounts/accounts-middleware');
const router = express.Router();

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll(req.query)
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(next)
})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(next)
})

router.post('/', mw.checkAccountNameUnique, mw.checkAccountPayload, (req, res) => {
  // DO YOUR MAGIC
  const postBody = {...req.query}
  Accounts.create(postBody)
  .then(post => {
    res.status(210).json(post)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error adding post',
      error: err
    })
  })
})

router.put('/:id', mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
  .then(account => {
    res.status(200).json(account)
  })
  .catch(next)
});

router.delete('/:id', mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
  .then(()=> {
    res.status(200).json({message: 'the account objects last words were, "I will haunt yoooou!"'})
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({
    message: err.message, 
    stack: err.stack, 
    custom: 'something went terrible in the users router'
  })
})

module.exports = router;
