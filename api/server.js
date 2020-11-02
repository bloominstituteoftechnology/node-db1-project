const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter = require('./accountRouter')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter)

module.exports = server;
