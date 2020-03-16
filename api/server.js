const express = require("express");
// Add Router
const accountRouter = require("../accounts/accountRouter");

// const db = require("../data/dbConfig.js");   Remove to Router

const server = express();

server.use(express.json());

// add link to routing
server.use("/api/accounts", accountRouter);

server.use(function(req, res, next) {
    res.status(404).json({message: "page not found"})
  })

module.exports = server;
