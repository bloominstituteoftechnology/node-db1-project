const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

//GET
router.get('/', (req, res) => {
    db.select().from('accounts')
    .then(item => {
        res.json(item)
    })
    .catch(err => {
        res.status(500).json({message: 'Error returning item', err})
    })
})

//GET:ID
router.get('/:id', (req, res) => {
    db.select().from('accounts')
    .where({id: req.params.id})
    .then(item => {
        if(item) {
            res.status(200).json({item})
        } else {
            res.status(400).json({message: 'item not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error returning item', err})
    })
})

//POST
router.post('/', (req, res) => {
    const accData = req.body;
 db.select().from('accounts')
 .insert(accData)
 .then(item => {
     res.status(201).json(item)
 })
 .catch(err => {
     res.status(500).json({message: 'failed to make post'})
 })
})

//PUT
router.put('/:id', (req, res) => {
 const accData = req.body;
 const {id} = req.params;

 db.select().from('accounts')
 .where({id})
 .update(accData)
 .then(count=> {
     if(count) {
         res.json({updated: count})
     } else {
         res.status(404).json({message: 'invalid id'})
     }
 })
 .catch(err => {
     res.status(500).json({message:'failed to update', err})
 })
})

router.delete('/', (req, res) => {

})

module.exports = router;