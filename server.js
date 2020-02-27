const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require('./routes/accountRoutes');

const server = express();

server.use(express.json());
server.use('/accounts', accountRouter);

server.use((err, req, res, next) => {
	res.status(500).json({ message: 'Server Error' });
});

module.exports = server;
