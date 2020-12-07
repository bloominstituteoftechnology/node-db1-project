const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
const accountRouter = require('./accounts/account-router')

server.use(express.json());
server.use('/api/accounts', accountRouter)


module.exports = server;
