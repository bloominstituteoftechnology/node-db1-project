const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const accountServer = require('../accounts/account-router')

server.use(express.json());

server.use('/accounts', accountServer)

module.exports = server;
