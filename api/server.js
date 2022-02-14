const express = require("express");
const morgan = require('morgan');
const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());
server.use(morgan('dev'))

server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
    res.send(`
      <h2>Accounts Database</h2>
      <p>Welcome to Accounts Database</p>
    `);
  });

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found',
    })
})

module.exports = server;
