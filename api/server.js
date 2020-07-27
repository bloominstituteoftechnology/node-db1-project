const express = require("express");
const db = require("../data/dbConfig.js");
const AccountsRouter = require('../accounts.js');
const server = express();

server.use(express.json());
server.use('/api/accounts', AccountsRouter);

module.exports = server;
