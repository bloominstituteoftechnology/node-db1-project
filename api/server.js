const express = require("express");

const accountRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: 'We are good to go!' })
})


module.exports = server;
