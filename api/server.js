const express = require("express");

const AccountRouter = require("../accounts/index");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "Hello from the server" });
  });

module.exports = server;
