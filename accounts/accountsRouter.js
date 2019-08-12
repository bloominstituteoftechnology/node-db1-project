const express = require('express')

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('name', 'budget')
  .from('accounts')
  .then(acc => {
    res.status(200).json(acc)
  })
  .catch(error => {
    res.status(500).json({ message: 'error getting accounts' })
  })
})

router.get('/:id', (req, res) => {
  db('accounts')
  .where({ id: req.params.id, })
  .first()
  .then(acc => {
    if(acc){
      res.status(200).json(acc)
    } else {
      res.status(404).json({ message: 'Account not found' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Error getting accounts' })
  })
})

router.put('/:id', (req, res) => {
  const accChanges = req.body;
  db('accounts')
  .where('id', '=', req.params.id)
  .update(accChanges)
  .then(acc => {
    if(acc){
      res.status(201).json(acc)
    } else {
      res.status(404).json({ message: 'Account not found' })
    }
  })
  .catch(error => { 
    console.log(error)
    res.status(500).json({ message: 'error modifying account' })
  })
})

router.post('/', (req, res) => {
  const { body } = req;
  db('accounts')
  .insert(body, 'id')
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => { 
    res.status(500).json({ message: 'Error creating account' })
  })
})

router.delete('/:id', (req, res) => {
  
})



module.exports = router