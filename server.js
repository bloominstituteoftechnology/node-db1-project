const express = require('express');
const dotenv = require('dotenv');
const db = require('./data/dbConfig.js');
const Router = require('./accounts/Router');
const server = express();

server.use(express.json());
server.use('/api/accounts', Router);



module.exports = server;
