const express = require('express');

const db = require('./data/dbConfig.js');

const acctrouter = require ('./account/acctrouter.js');

const server = express();

server.use(express.json());
server.use('/api/account', acctrouter);

module.exports = server;