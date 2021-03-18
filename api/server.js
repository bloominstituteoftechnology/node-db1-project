const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const server = express();

server.use(express.json());
server.use(accountsRouter)
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: 'Server machine broke :(' })
})

module.exports = server;
