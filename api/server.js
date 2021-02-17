const express = require("express");

const accountsRouter = require("./accountsRouter");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRouter);

server.get("/", (_,res) => {
    res.json("Welcome to the accounts api")
});

module.exports = server;
