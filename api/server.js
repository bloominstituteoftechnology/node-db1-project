const express = require("express");
const AccountsRouter = require('../api/accounts/accounts-router')

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountsRouter);

module.exports = server;
