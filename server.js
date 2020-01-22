const express = require('express');

const Router = require('./data/Accounts/Router');

const server = express();

server.use(express.json());

server.use('/api/accounts', Router);

module.exports = server;