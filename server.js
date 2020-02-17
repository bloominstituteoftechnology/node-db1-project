const express = require("express");
const accountsRoutes = require("./routes/accountsRoutes");
// const db = require("./data/dbConfig.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "IT'S WORKING!" });
});

//  Routing
server.use("/accounts", accountsRoutes);

module.exports = server;
