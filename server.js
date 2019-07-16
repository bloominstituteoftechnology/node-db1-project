const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.get('/:id', (req, res) => {
    // code
})

server.post('/', (req, res) => {
    const account = req.body;

    db('accounts').insert(account, 'id')
    .then(accounts => {
        const accountbyID = accounts[0];
        res.status(201).json(accountbyID)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = server;