const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to retrieve the accounts from the database' });
        });
});


server.post('/', (req, res) => {
    const accountData = req.body;

    db('accounts').insert(accountData)
        .then(accountId => {
            res.status(201).json({ message: 'Successfully created account', accountID: accountId });
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to post the account data to the database' });
        });
});

server.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts').where({id}).update(changes)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ updated: count });
            } else {
                res.status(404).json({ message: `Unable to find account with id ${id} in the database, please make sure the id is correct.` });
            };
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to update the account in the database' });
        });
});


server.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({id}).del()
        .then(count => {
            count ? res.status(200).json({ deleted: count })
            : res.status(404).json({  message: `Unable to find account with id ${id} in the database, please make sure the id is correct.` });
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to delete the account in the database' });
        });
});

module.exports = server;