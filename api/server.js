const express = require("express");
const accountsRouter = require("./accounts/accounts-router")

const server = express();
server.use(express.urlencoded({extended:false}))
server.use(express.json());
server.use("/", accountsRouter)

module.exports = server;
