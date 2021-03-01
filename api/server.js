const express = require("express");
const accountRouter = require("./accounts/accounts-router")

const server = express();

server.use(express.json());
server.use("/accounts",accountRouter)

module.exports = server;
