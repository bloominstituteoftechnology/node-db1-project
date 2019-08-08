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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {

  }
  catch(error) {
    res.status(500).json({ message: "Could Not Get Account", error: error})
  }
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
    const account = await db('accounts').where('id' = id);
    if(account) {
      next();
    } else(error) {
      res.status(404).json({ message: `Account with id ${id} does not exist`, error: error})
    }
  }
  catch(error) {
    res.status(500).json({ message: "Error with validateAccountId", error: error})
  }
}

module.exports = router;
