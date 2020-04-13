const express = require("express");

const db = require("../data/dbConfig.js");

const accounts = require('../accounts');

const server = express();

server.use(express.json());

server.use("/api/accounts", accounts);

server.get("/", (req, res) => {
    res.send(`<h1>DB project</h1>`);
  });
  

module.exports = server;
