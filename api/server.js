const express = require("express");

const AccountRouter = require("./accountRouter.js");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", logger, AccountRouter);

server.get("/", (req, res) => {
  res.send("<h3>Node Database Project</h3>");
});

function logger(req, res, next) {
  console.log(`${req.method} request made to ${req.originalUrl}`);
  next();
}

module.exports = server;
