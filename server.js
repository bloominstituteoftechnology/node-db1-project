const express = require("express");
// const db = require("./data/dbConfig.js");
const AccountRouter = require("./accounts/accounts-router.js");
const server = express();

server.use(express.json());
server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.send("<h1>ayyyyyye test</h1>");
});

module.exports = server;
