const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const accountsRouter = require("../accountsRouter");

server.use(express.json());

server.use("/api/accounts", accountsRouter);

module.exports = server;
