const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {

  }
  catch(error) {
    res.status(500).json({ message: "Could Not Get Accounts", error: error})
  }
});

router.get('/:id', async (req, res) => {
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

module.exports = router;
