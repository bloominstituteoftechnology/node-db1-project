const express = require('express');

const AccountRouter = require('./accounts/account-router.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<h1>WebDB Challenge 1</h1>')
})

module.exports = server;
