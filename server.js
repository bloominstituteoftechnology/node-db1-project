const express = require('express');

const accountsRouter = require('./accounts/accountsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

module.exports = server;