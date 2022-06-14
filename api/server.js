const express = require("express");

// Bring in Accounts Router
const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

// Connect the router exactly here, after json but before endpoint
server.use('/api/accounts', accountsRouter);

// Global Endpoint 
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found',
    })
})

module.exports = server;
