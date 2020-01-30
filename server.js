const express = require("express");

const db = require("./data/dbConfig.js");
const AcctRouter = require("./acctRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts", AcctRouter);

server.get("/", (req, res) => {
  res.send("Database API is up and running");
});

module.exports = server;
