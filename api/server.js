const express = require("express");

const accountRouter = require("./accountRouter/accountRouter.js");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/accounts", accountRouter);

server.get("/", (req, res) => {
  res.status(200).send(`<h1>Aaron Verdine's Accounts API</h1>`);
});

function logger(req, res, next) {
  console.log(
    `${new Date().toISOString()} ${req.ip} ${req.method} ${req.url} `
  );

  next();
}

module.exports = server;
