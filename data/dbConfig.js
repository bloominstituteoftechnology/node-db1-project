const express = require("express");

//const db = require("./data/dbConfig.js");

const accountsRouter = require("./accounts/accountsRouter.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRouter);

module.exports = server;