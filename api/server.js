const express = require("express");
const accountsRouter = require('../api/accounts/accounts-router');
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
      custom: 'not sure what went wrong, but you done goofed.'
    })
  })
module.exports = server;
