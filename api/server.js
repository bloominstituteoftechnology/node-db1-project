const express = require("express");
const accountsRoute = require("./accountsRoute");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRoute);

server.get("/", (req, res) => {
  res.json({ message: "Server is connected!" });
});

module.exports = server;
