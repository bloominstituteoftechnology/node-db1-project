const express = require("express");

const accountsRouter = require("../data/seeds/accounts-router");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/accounts", accountsRouter);

module.exports = server;