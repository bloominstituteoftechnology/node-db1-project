const express = require("express");

const server = express();

server.use(express.json());
server.use("/api/accounts", require("./accounts/accounts-router"));

module.exports = server;
