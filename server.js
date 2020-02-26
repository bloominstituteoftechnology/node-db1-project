const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require('./routes/accountRoutes');

const server = express();

server.use(express.json());
server.use('/accounts', accountRouter);

server.use((err, req, res, next) => {
	console.log(err);
	res.status(err.statusCode || 500).json(err);
});
module.exports = server;
