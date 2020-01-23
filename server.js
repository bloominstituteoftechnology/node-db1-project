const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) =>{
    res.send("Hello from the server")
})

module.exports = server;