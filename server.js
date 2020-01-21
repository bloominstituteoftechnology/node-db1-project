const express = require('express');

const db = require('./data/dbConfig.js');

const userRouter = require('./accounts/accountRoutes');

const server = express();

server.use(express.json());
server.use('/api/user', userRouter);

module.exports = server;