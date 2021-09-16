const express = require("express");

const server = express();

const accountsRouter = require('./accounts/accounts-router');


server.use('/accounts', accountsRouter);


server.use(express.json());





module.exports = server;
