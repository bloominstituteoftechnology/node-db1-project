const express = require('express');
const cors = require('cors')
const helmet =  require('helmet')


const db = require('./accounts/accountRouter');

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/accounts', db)

server.get('/', (req, res) => {
    res.send('<h1>Account Management</h1>')
})

module.exports = server;