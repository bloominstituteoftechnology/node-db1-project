const express = require('express');

const db = require('./data/dbConfig.js');

const dataRouters = require('./data-Routers/Router');

const server = express();

server.use(express.json());

server.use('/api/accounts', dataRouters);

module.exports = server;