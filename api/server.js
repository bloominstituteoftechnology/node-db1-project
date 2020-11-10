const express = require("express");

const budget = require('./budget')
const welcome = require('./welcome')

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/budget",budget)
server.use("/", welcome)


module.exports = server;
