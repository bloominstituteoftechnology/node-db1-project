const express = require("express");
const server = express();
const AccountRouter = require('./accounts/accounts-router');

server.use(express.json());
server.use("/api/accounts", AccountRouter)

server.get("/", (req, res) => {
    res.status(200).json( "API is running" )
  })

module.exports = server;
