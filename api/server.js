const express = require("express");
const accountRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter)

module.exports = server;
