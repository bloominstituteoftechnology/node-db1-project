const express = require('express');

const AccountsRouter = require('./accounts/account-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

// const db = require('../data/dbConfig.js');

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from mars' });
});

module.exports = server;
