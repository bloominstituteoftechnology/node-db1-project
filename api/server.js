const express = require("express");
const projectRouter = require("./routers.js");

const db = require("../data/dbConfig.js");

const server = express();

//custom middleware
function logger(req, res, next) {
  console.log(
    "Req Method:",
    req.method,
    ",  Req URL:",
    req.url,
    ",  Req Timestamp:",
    new Date().toString()
  );
  next();
}

server.use(express.json());
server.use(logger);
server.use("/api", projectRouter);

module.exports = server;
