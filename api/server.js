const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.json({
        message: "Welcome!",
    });
})

module.exports = server;
