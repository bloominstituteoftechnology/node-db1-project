const express = require('express');

const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

server.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id: id })
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

server.post('/', (req, res) => {
    db('accounts')
        .insert(req.body)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

server.put('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id: id })
        .update(req.body)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

server.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id: id })
        .del()
        .then(account => {
            res.status(201).json(account);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

module.exports = server;