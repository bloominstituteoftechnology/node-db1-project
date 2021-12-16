const express = require("express");

const accountsRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRouter);

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Error 404: Page not found',
        //error: err,'Not found'
    })
})

module.exports = server;
