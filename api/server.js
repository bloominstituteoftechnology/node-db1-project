const express = require("express");
//* Pull in accounts router *// 
const accountsRouter = require("../accounts/accountsRouter"); 

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
//* Tell the server how to use accounts router *// 
server.use("/api/accounts", accountsRouter); 

module.exports = server;
