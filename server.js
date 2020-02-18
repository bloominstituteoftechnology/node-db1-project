const express = require('express');

const db = require('./data/dbConfig.js');

const router = require('./data/router/router.js')

const server = express();

server.use(express.json());

server.use('/api/accounts', router);

server.get('/', (req, res) =>{
    res.send('<h2>Node DB-1 Project</h2>')
})

module.exports = server;