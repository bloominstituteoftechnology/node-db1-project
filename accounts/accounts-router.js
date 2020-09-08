const express = require('express');

// database access using knex
const db = require('../data/dbConfig'); //db is connection to database

const router = express.Router();

// Retrieve All Accounts
router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json({ data: accounts })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message})
    });
});


// Retrieve single account
router.get('/:id', (req, res) => {
    const accountId = req.params.id;
    db('accounts').where({ id: accountId })
    .then(account => {
        res.status(200).json({ account: account })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: error.message})
    });
});

router.post('/', (req, res) => {
    const account = req.body;
    db('accounts')
    .insert(account)
    .returning('id')
    .then( ids => {
        res.status(201).json({ newAccount: ids })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message })
    })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const accountId = req.params.id;
    db('accounts')
    .update(changes)
    .where({ id: accountId})
    .then(count => {
        if(count) {
            res.status(200).json({message: 'account updated successfully'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message })
    });
});

router.delete('/:id', (req, res) => {
    const accountId = req.params.id;

    db('accounts')
    .where({ id: accountId })
    .del()
    .then(count => {
        if(count) {
            res.status(200).json({message: 'account deleted successfully'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message })
    });
});

module.exports = router;