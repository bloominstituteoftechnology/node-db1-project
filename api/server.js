const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const AccountsRouter = require('./accounts/accounts-router');
server.use('/api/accounts', AccountsRouter);

module.exports = server;
