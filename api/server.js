const express = require("express");

const accountRouter = require("../accounts/accounts-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
