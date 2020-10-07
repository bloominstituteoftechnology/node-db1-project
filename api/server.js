const express = require("express");


const accountsRouter = require("../routers/accountsRouter.js");
const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/accounts/', accountsRouter);

function logger (req, res, next){
    console.log(`body: ${req.body} type: ${req.type}`)
    next();
}

module.exports = server;
