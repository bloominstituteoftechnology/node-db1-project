const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router()


// GET

router.get('/', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(error => {
      res.status(500).json({message: 'error getting accounts from db'})
    })
})


module.exports = router