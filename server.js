const express = require('express');

const AccountsRouter = require('./accounts-router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
  res.send('<h1>Fun with SQL</h1>');
});

module.exports = server;
