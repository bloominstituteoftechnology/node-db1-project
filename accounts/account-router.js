const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await db.select('*').from('accounts')
    res.status(200).json(accounts)
  }
  catch(error) {
    res.status(500).json({ message: "Could Not Get Accounts", error: error})
  }
});

router.get('/:id', validateAccountId, async (req, res) => {
  res.status(200).json(req.account)
})

router.post('/', async (req, res) => {
  try {

  }
  catch(error) {
    res.status(500).json({ message: "Could Not Create New Account", error: error})
  }
})

router.put('/:id', async (req, res) => {
  try {

  }
  catch(error) {
    res.status(500).json({ message: "Could Not Update Account", error: error})
  }
})

router.delete('/:id', async (req, res) => {
  try {

  }
  catch(error) {
    res.status(500).json({ message: "Could Not Delete Account", error: error})
  }
})

// middlewares

async function validateAccountId( req, res, next ) {
  const { id } = req.params;
  try {
    const account = await db('accounts').where({id});
    if(account.length) {
      req.account = account;
      next();
    } else {
      res.status(404).json({ message: `Account with id ${id} does not exist` })
    }
  }
  catch(error) {
    res.status(500).json({ message: "Error with validateAccountId", error: error})
  }
}

module.exports = router;
