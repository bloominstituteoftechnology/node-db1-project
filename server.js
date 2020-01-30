const express = require('express');
const accountsRouter = require('./Router/accountsRouter.js');
const logger = require('./globalMiddleware.js');

const server = express();

server.use(logger);
server.use(express.json());

server.use('/api/accounts', accountsRouter);

module.exports = server;
