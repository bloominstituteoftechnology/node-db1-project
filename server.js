const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

// importing router.js file
const router = require('./router.js');

server.use(express.json());

// setting router MW here
server.use('/api/accounts', router);

module.exports = server;