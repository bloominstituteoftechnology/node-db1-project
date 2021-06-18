const express = require("express");

const server = express();
const accountsRouter = require("./accounts/accounts-router")

server.use(express.json());
server.use("/api/accounts", accountsRouter)

//sanity checker 
server.get("/", (req, res) => {
    res.status(200).json({
        message: 'Sanity Check. Welcome to the machine'
    })
})

module.exports = server;
