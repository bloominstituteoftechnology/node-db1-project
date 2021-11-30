const express = require("express");
const AccRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccRouter);

module.exports = server;
