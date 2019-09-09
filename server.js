const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
    db('accounts')
    .then(accounts => res.status(200).json(accounts))
    .catch(err => res.status(500).json({ message: 'Failed to get accounts' }))
});

server.get('/api/:id', (req, res) => {
    const {id} = req.params;
    db('accounts')
        .where({id})
        .first()
        .then(accts => res.status(200).json(accts))
        .catch(err => res.status(500).json({ message: 'Failed to get account' }))

});

server.post('/api', (req, res) => {

});

server.put('/api/:id', (req, res) => { 

});

server.delete('/api/:id', (req, res) => {

});

module.exports = server;