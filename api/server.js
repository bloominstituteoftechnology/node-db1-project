const express = require("express");
// consume the router  
const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());
// connect router exactly here
server.use('/api/accounts', accountsRouter);

// Test api
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found',
    })
})
module.exports = server;
