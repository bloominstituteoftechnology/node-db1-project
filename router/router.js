const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.get('/:id', (req,res) => {
    db('accounts')
    .where('id', req.params.id)
    .first()
    .then(account => {
        if(account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({message: 'Id could not be found'})
        }
    })
})

router.post('/', (req, res) => {
    const accountData = req.body
    db('accounts')
    .insert(accountData, 'id')
    .then(newId => {
        const id = newId[0];
        db('accounts')
        .where({id})
        .first()
        .then(newAccount => {
            res.status(200).json(newAccount)
        })
        .catch(error => {
            res.status(500).json({error: 'error'})
        })
    }) 

})

router.patch('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params
    db('accounts')
    .where({id})
    .update(changes)
    .then(num => {
        if (num > 0) {
            res.status(200).json({message: 'updated'})
        } else {
            res.status(404).json({message: 'error'})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'error'})
    })
})

router.delete('/:id', (req,res) => {
    db('accounts')
    .where('id', req.params.id)
    .del()
    .then(deleted => {
    if (deleted) {
        res.status(200).json({message: 'deleted'})
    } else {
        res.status(404).json({message: 'error'})
    }
}) 
.catch(error => {
    res.status(500).json({error: 'error'})
})
})

module.exports = router; 