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



// POST
router.post('/', (req, res) => {
  const { name, budget } = req.body

  if(!name || !budget) {
    res.status(400).json({
      message: 'Please provide name and budget'
    })
   return
  }

  db('accounts').insert(req.body, 'id')
  .then(count => {
     res.status(200).json(count)
  })
  .catch(error => {
    res.status(500).json({message: 'Internal server error'})
  })
})







module.exports = router