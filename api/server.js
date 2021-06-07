const express = require("express");

const server = express();
const accountRouter = require('./accounts/accounts-router')

server.use(express.json());
server.use('/api/accounts', accountRouter)
module.exports = server;