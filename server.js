const express = require('express')

const db = require('./data/dbConfig.js')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('<h1>Homies helping the DB with Knex</h1>')
});

server.get('/api/accounts', (req, res) => {
    db("accounts")
        .then(item => {
            res.status(200).json(item)
        })
        .catch(error => {
            req.status(500).json({ message: "There was a database error." })
        })
});

server.get('/api/accounts/:id', (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error getting that ID." })
        });
})

module.exports = server