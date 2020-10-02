const express = require("express");
const accountsRouter = require("./accountsRouter");
// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);


// error middleware catches all previous middleware errors, place last in file
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong, try again",
	})
})

module.exports = server;
