const express = require('express');
const accountRouter = require("./account-router")
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use("/api/accounts", accountRouter)

server.get('/', (req, res) => {
    res.send(process.env.SECRET_MESSAGE || `<h2>Let's write SQL!</h2>`);
  });

server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((err, req, res, next) => {
    console.log(err)
      res.status(500).json({
        message: 'Error retrieving the data'
   })
})

module.exports = server;