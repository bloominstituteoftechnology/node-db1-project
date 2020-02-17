const express = require("express");
const accountsRoutes = require("./routes/accountsRoutes");
const db = require("./data/dbConfig.js");

const server = express();

server.use("/accounts", accountsRoutes);

server.use(express.json());

module.exports = server;
