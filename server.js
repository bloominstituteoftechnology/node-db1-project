const express = require('express');

const db = require('./data/dbConfig.js');

const AccountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send(`Welcome to database project`)
})

module.exports = server;