const express = require('express');

// database access using knex
const knex =  require('../data/dbConfig.js');

const router = express.Router();

// CRUD endpoints

// Create
router.post('/', async (req, res) => {
  const accountData = req.body;

  try {
    const numberOfAccounts = await knex('accounts').insert(accountData)
    res.status(201).json(numberOfAccounts);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      errorMessage: "Failed to create new account"
    })
  }
})

// Read
router.get('/', async (req, res) => {
  try {
    const { limit = 10, sortby = 'id', sortdir} = req.query;
    const accounts = await knex('accounts')
      .orderBy(sortby, sortdir)
      .limit(limit)
    res.status(200).json(accounts)
  } catch (err) {
    console.log("Error: ", err)
    res.status(500).json({
      errorMessage: "Problem with db"
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const account = await knex('accounts').where({
      id: id
    }).first();
    if (id) {
      res.status(200).json(account)
    } else {
      res.status(400).json({
        errorMessage: "Invalid ID"
      })
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      errorMessage: "Could not retrieve account"
    })
  }
})

// Update
router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const updatedAccount = req.body;

  try {
    const count = await knex('accounts').insert(updatedAccount).where(id)
    if (count) {
      res.status(200).json({ updated: count })
    } else {
      res.status(404).json({
        errorMessage: "Invalid info"
      })
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      errorMessage: "Could not updated account"
    })
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const count = await knex('accounts').delete().where({id})
    if (count) {
      res.status(200).json({ removed: count })
    } else {
      res.status(404).json({
        errorMessage: "Invalid ID"
      })
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      errorMessage: "Could not delete account"
    })
  }
})

module.exports = router;