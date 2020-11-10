const express = require("express");

const db = require("../data/dbConfig.js");
const accountsRouter = require('../accounts/accounts-router')
const server = express();

server.use(express.json());


server.get('/', (req, res)=> res.status(200).send(`<h1> API up and running </h1>`))

server.use('/api/accounts', accountsRouter)

module.exports = server;
