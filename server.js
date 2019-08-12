const express = require('express');

const AccountsRouter = require('./accounts/accountsRouter')

const server = express();

server.use(express.json());
server.use(logger)
server.use('/api/accounts', AccountsRouter)

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  console.log(`\nYou have made a ${method} request to ${url}\n`, Date())
  next()
};

server.get('/', (req, res) => {
  res.send('<h3>DB Building with KNEX. This endpoint works!</h3>');
});

module.exports = server;