const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

const AccountRouter = require('./accounts/account-router.js');

server.use(express.json());

server.use('/api/accounts', AccountRouter);
// server.use('/api', AccountRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex</h3>');
});


module.exports = server;