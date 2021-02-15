const express = require("express");

// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const accountsRouter = require('./accounts-router');

server.use('/api/accounts', accountsRouter)

module.exports = server;
