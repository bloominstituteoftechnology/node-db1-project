const accountRouter = require('../account-router')

const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/accounts", accountRouter)

server.use("/account", accountRouter)

module.exports = server;

