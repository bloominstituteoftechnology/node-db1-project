const express = require("express");

const server = express();

server.use(express.json());


server.get("/api/accounts", (req, res) => {
    
})

module.exports = server;
