const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();
const accountRoute = require('./accounts/accountRouter')

server.use(express.json());


server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({message: "something went wrong"})
})

server.use('/api/accounts', accountRoute)

module.exports = server;

