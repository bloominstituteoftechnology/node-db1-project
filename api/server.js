const express = require("express");

const AccRouter = require("../accounts/accounts-router");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: up });
});

module.exports = server;
