const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use("/api/router", db)

server.get("/", (req, res) => {
    res.send("Server Is Responsive :)")
}); 

module.exports = server;