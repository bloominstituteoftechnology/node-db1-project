const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.json(accounts)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error rerieving accounts", err});
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    
    try {
        const account = await db.select('*').from('accounts').where({id}).first();
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(400).json({message: "Account not found"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "sorry, ran into an error"});
    }
});

router.post('/', async (req, res) => {
    const accountData = req.body;

    try {
        const account = await db.insert(accountData).into('accounts');
        res.status(201).json(account);
    } catch (err) {
        console.log (err);
        res.status(500).json({ message: 'db problem', error: err});
    }
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts').where({id}).update(changes)
    .then(count => {
        if (count) {
            res.status(200).json({ updated: count});
        } else {
            res.status(404).json({message: "invalid id"});
        }
    })
    .catch(err => {
        res.status(500).json({ message: "db problem"});
    });
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const count = await db.del().from('accounts').where({id});
        count ? res.status(200).json({ deleted: count})
            : res.status(404).json({message: "invalid id"});
    } catch (err) {
        res.status(500).json({message: 'database error', error: err});
    }
});

module.exports = router;