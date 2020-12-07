const express = require("express");
const accountRouter = require("../routers/accountRouter");

const server = express();

server.use("/api/accounts", accountRouter);

server.use(express.json());

module.exports = server;
