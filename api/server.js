const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts').then(accounts => {
        res.status(200).json(accounts);
    }).catch(err => {
        res.status(500).json({message: 'Failed to get accounts'});
    });
});

server.get('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: parseInt(req.params.id, 10)}).then(account => {
        if (account.length) {
            res.status(200).json(account);
        } else {
            res.status(404).json({message: 'ID not found'});
        }
    }).catch(err => {
        res.status(500).json({message: 'Failed to get account'});
    });
});

server.post('/api/accounts', (req, res) => {
    db('accounts').insert({
        name: req.body.name,
        budget: req.body.budget
    }).then(id => {
        res.status(201).json(id);
    }).catch(err => {
        res.status(500).json({message: 'Failed to create account'});
    });
});

server.put('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: parseInt(req.params.id, 10)}).update({
        name: req.body.name,
        budget: req.body.budget
    }).then(count => {
        res.status(200).json(count);
    }).catch(err => {
        res.status(500).json({message: 'Failed up update account'});
    });
});

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: parseInt(req.params.id, 10)}).del().then(count => {
        res.status(200).json(count);
    }).catch(err => {
        res.status(500).json({message: 'Failed to delete account'});
    });
});

module.exports = server;
