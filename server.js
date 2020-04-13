const express = require("express");
const db = require("./data/dbConfig.js");
const server = express();
server.use(express.json());

const accountRouter = require('./accountsRouter');


server.get("/", (req, res) => {
    res.send(`<h1>API DB1 PROJECT LAMBDA</h1>`);
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

function logger(req, res, next) {
  console.log("new " + req.method + " request to URL " + req.originalUrl);
  next();
};

server.use(logger);

server.use('/api/projects', accountRouter);

module.exports = server;