const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const db = require("../data/dbConfig.js");

const server = express();
server.use('/api/accounts', accountsRouter)
server.use(express.json());

module.exports = server;
