const express = require("express");

const db = require("../data/dbConfig.js");

const AccountRouter = require('./accounts/account-router')

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter)

module.exports = server;
