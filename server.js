const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
        .then(accounts => res.status(200).json(accounts))
        .catch(error => res.status(500).json({ message: 'Failed to get accounts' }))
});

server.get('/api/accounts/:id', (req, res) => {
    // SELECT * FROM Posts WHERE id = param.id
    const { id } = req.params;

    db('accounts').where({ id })
        .then(accounts => {
            const account = accounts[0];

            if (account) {
                res.json(account)
            } else {
                res.status(404).json({ message: 'Invalid account id' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get account' })
        })
});

server.post('/api/accounts', (req, res) => {
    // INSERT INTO Posts (all of the keys from req.body) VALUES (all of the values from req.body) 
    const accountData = req.body;
    if (accountData.name && accountData.budget) {
        db('accounts')
            .insert(accountData)
            .then(ids => {
                res.status(201).json({ newAccountId: ids[0] })
            })
            .catch(error => {
                res.status(500).json({ message: 'Failed to create account' })
            })
    } else {
        res.status(400).json({ message: 'Please provide a name and budget for this account' })
    };
});

server.put('/api/accounts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    // UPDATE Posts SET change.key = changes.value, changes.key = changes.value WHERE id = id;

    db('accounts').where({ id }).update(changes)
        .then(count => {
            if (count) {
                res.json({ updated: count })
            } else {
                res.status(404).json({ message: 'Invalid account id' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to update account' })
        })
});

server.delete('/api/accounts/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id }).del()
        .then(count => {
            if (count) {
                res.json({ deleted: count })
            } else {
                res.status(404).json({ message: 'Invalid account id' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to delete account' })
        })
});



module.exports = server;