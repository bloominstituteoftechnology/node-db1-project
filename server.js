const express = require("express");

const Router = require('./router/router')

const server = express();

server.use(express.json());
server.use('/api/accounts', Router)

module.exports = server;