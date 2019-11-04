const express = require('express');

const db = require('./data/dbConfig.js');
const accountsRouter = require("./data/accountsRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts",accountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex</h3>');
  });
  

module.exports = server;