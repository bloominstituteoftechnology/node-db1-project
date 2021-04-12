const express = require("express");
const accountRouter = require("./accounts/accounts-router.js")

const server = express();

server.use(express.json());
server.use("/api/accounts", accountRouter)

module.exports = server;
