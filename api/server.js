const express = require("express");
const accountsRouter = require('../router/accounts')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ API: 'The API is Running!' })
})
module.exports = server;
