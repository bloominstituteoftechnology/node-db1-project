const express = require("express");
const CustomerRouter = require('./customers/customer-router'); 

const db = require("../data/dbConfig.js");

const server = express();
server.use(express.json());
server.use("/api", CustomerRouter); 

module.exports = server;
